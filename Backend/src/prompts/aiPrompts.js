
const interviewPrompt = (topic, difficulty, count) => `You are an expert interviewer at Google, Amazon and Microsoft.
        Generate ${count} ${difficulty} DSA interview questions on "${topic}".

        For every question provide:
        1. Question
        2. Difficulty
        3. Hint (without revealing the solution)

        Return the response in clean Markdown.`;


const explainPrompt = (problem) => `You are a senior software engineer.
        Explain this DSA problem for interview preparation.

        Title: ${problem.title}
        Platform: ${problem.platform}
        Topic: ${problem.topic}
        Difficulty: ${problem.difficulty}
        User Notes: ${problem.notes}

        Give:
        1. Problem Summary
        2. Brute Force
        3. Optimal Solution
        4. Time Complexity
        5. Space Complexity
        6. Common Mistakes
        7. Similar Questions
        8. Interview Follow-up Questions`;


const revisionPrompt = (topic) => `Create revision notes for
    ${topic} Include Concept Template Complexity Mistakes
    Practice Problems`;


const mockInterviewPrompt = (topic, difficulty) => `You are a Senior Software Engineer interviewing a candidate.
    Ask ONLY ONE ${difficulty} DSA interview question on ${topic}.
    Rules:
    Do NOT provide the answer.
    Do NOT provide hints.
    Only ask the question.`;


const evaluateAnswerPrompt = (question, answer, topic, difficulty) => `
    You are a Google Software Engineer interviewer.
    Interview Topic: ${topic}
    Difficulty: ${difficulty}
    Question: ${question}
    Candidate Answer: ${answer}
    Evaluate the answer.
    Return STRICTLY in this JSON format: {
        "score":8,
        "feedback":"Detailed feedback",
        "nextQuestion":"Next interview question"
    }
    If this is the last question, return {
        "score":8,
        "feedback":"Detailed feedback",
        "nextQuestion":"END"
    }`;


const replyPrompt = (message) => `
You are InterviewPrep AI.

You help students prepare for coding interviews.

Always respond in proper Markdown.

Rules:
- Use headings.
- Use bullet points.
- Use numbered lists.
- For algorithms include:
  - Intuition
  - Algorithm
  - Complexity
  - Dry Run
  - C++ Code
- Wrap code inside triple backticks.
- Never answer in one large paragraph.

User Question:
${message}
`

module.exports = { interviewPrompt, explainPrompt, replyPrompt,
    revisionPrompt, mockInterviewPrompt, evaluateAnswerPrompt };