import api from "./api";

export const chatWithAI = async (message) => {

    const res = await api.post("/ai/chat", {
        message,
    });

    return res.data.reply;
};