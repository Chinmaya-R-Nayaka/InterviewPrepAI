import api from "./api";

export const chatWithAI = async (message) => {

    const res = await api.post("/ai/chat", {
        message,
    });

    return res.data.reply;
};

export const startInterview = async (data) => {

    const res = await api.post("/ai/mock/start", data);

    return res.data;

};

export const submitInterviewAnswer = async (data) => {

    const res = await api.post("/ai/mock/answer", data);

    return res.data;

};

export const getInterviewReport = async (sessionId) => {

    const res = await api.get(`/ai/mock/${sessionId}`);

    return res.data;

};