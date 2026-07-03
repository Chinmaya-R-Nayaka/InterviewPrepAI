const { GoogleGenAI } = require("@google/genai");

const myai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

module.exports = myai;