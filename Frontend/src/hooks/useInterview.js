import { useState } from "react";
import {startInterview, submitInterviewAnswer, getInterviewReport} from "../services/aiService";

const useInterview = () => {
    const [sessionId, setSessionId] = useState(null);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [score, setScore] = useState(null);
    const [completed, setCompleted] = useState(false);
    const [report, setReport] = useState(null);
    

    const start = async (data) => {
        setLoading(true);
        try{
            const res = await startInterview(data);
            setSessionId(res.sessionId);
            setQuestion(res.question);
            setCompleted(false);
            setFeedback("");
            setScore(null);
        }
        catch(err){
            console.error(err);
        }
        finally{
            setLoading(false);
        }
    };
    

    const submit = async (answer) => {
        setLoading(true);
        try{
            const res = await submitInterviewAnswer({ sessionId, answer });
            setFeedback(res.feedback);
            setScore(res.score);

            if(res.completed){
                setCompleted(true);
                const reportRes = await getInterviewReport(sessionId);
                setReport(reportRes.report);
            }
            else{
                setQuestion(res.nextQuestion);
            }
        }
        catch(err){
            console.error(err);
        }
        finally{
            setLoading(false);
        }
    };

    return{
        loading, sessionId, question, feedback,
        score, completed, report,
        start, submit,
    };
};

export default useInterview;