const ai = require("../config/gemini");
const InterviewSession = require("../models/InterviewSession");
const { interviewPrompt, evaluateAnswerPrompt } = require("../prompts/aiPrompts");
const { generateAIResponse } = require("../services/aiService");
const asyncHandler = require("../utils/asyncHandler");


const chatWithAI = asyncHandler(async (req, res) => {

    const { prompt } = req.body;

    if(!prompt){
        return res.status(400).json({
            success: false,
            message: "Prompt is required",
        });
    }

    const systemPrompt = `You are an expert DSA and Software Engineering interviewer.
        Always answer in this format:
        1. Concept
        2. Intuition
        3. Algorithm
        4. Time Complexity
        5. Space Complexity
        6. Common Mistakes
        7. Interview Follow-up Questions

        Keep answers beginner-friendly.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${systemPrompt}\n\n${prompt}`,
    });

    res.status(200).json({
        success: true,
        answer: response.text,
    });
});


const generateInterviewQuestions = asyncHandler(async (req, res) => {

    const {topic, difficulty = "Medium", count = 10} = req.body;
    if(!topic){
        return res.status(400).json({
            success: false,
            message: "Topic is required"
        });
    }

    const prompt = interviewPrompt(topic, difficulty, count);
    const response = await generateAIResponse(prompt);

    res.status(200).json({
        success: true,
        questions: response.text,
    });
});


const explainProblem = asyncHandler(async (req, res) => {

    const problem = await Problem.findOne({_id: req.params.id, user: req.user._id});
    if(!problem){
        return res.status(404).json({
            success: false,
            message: "Problem not found"
        });
    }

    const prompt = explainPrompt(problem);
    const response = await generateAIResponse(prompt);

    res.status(200).json({
        success: true,
        explanation: response.text
    });
});


const startMockInterview = asyncHandler(async(req,res)=>{

    const { topic, difficulty="Medium", totalQuestions=5 } = req.body;
    const prompt = mockInterviewPrompt( topic, difficulty );

    const question = await generateAIResponse(prompt);
    const session = await InterviewSession.create({
        user:req.user._id,
        topic,
        difficulty,
        totalQuestions,
        history:[{ question }]
    });

    res.status(201).json({
        success:true,
        sessionId:session._id,
        question
    });
});


const submitAnswer = asyncHandler(async (req, res) => {

    const { sessionId, answer } = req.body;
    const session = await InterviewSession.findById(sessionId);
    if(!session){
        return res.status(404).json({
            success: false,
            message: "Session not found"
        });
    }

    const currentQuestion = session.history[session.history.length - 1].question;
    const prompt = evaluateAnswerPrompt(
        currentQuestion,
        answer,
        session.topic,
        session.difficulty
    );
    const aiResponse = await generateAIResponse(prompt);

    let parsed;
    try{
        parsed = JSON.parse(aiResponse.replace(/```json|```/g, "").trim());
    }
    catch{
        return res.status(500).json({
            success: false,
            message: "Failed to parse AI response",
            raw: aiResponse
        });
    }

    session.history[ session.history.length - 1 ].answer = answer;
    session.history[ session.history.length - 1 ].feedback = parsed.feedback;
    session.history[ session.history.length - 1 ].score = parsed.score;
    session.score += parsed.score;

    if(parsed.nextQuestion === "END" || session.currentQuestion >= session.totalQuestions){
        session.completed = true;
    } 
    else{
        session.currentQuestion++;
        session.history.push({
            question: parsed.nextQuestion
        });
    }

    await session.save();
    res.status(200).json({
        success: true,
        completed: session.completed,
        feedback: parsed.feedback,
        score: parsed.score,
        nextQuestion: parsed.nextQuestion
    });
});


const getInterviewReport = asyncHandler(async (req, res) => {

    const session = await InterviewSession.findById(req.params.sessionId);
    if(!session){
        return res.status(404).json({
            success: false,
            message: "Session not found"
        });
    }
    const average = session.history.length > 0 ? (session.score / session.history.length).toFixed(2) : 0;

    res.status(200).json({
        success: true,
        report: {
            topic: session.topic,
            difficulty: session.difficulty,
            totalQuestions: session.totalQuestions,
            attempted: session.history.length,
            totalScore: session.score,
            averageScore: average,
            completed: session.completed,
            history: session.history
        }
    });
});


module.exports = { chatWithAI, generateInterviewQuestions,
    explainProblem, startMockInterview, submitAnswer, getInterviewReport
};