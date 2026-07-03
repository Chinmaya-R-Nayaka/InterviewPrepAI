const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { chatWithAI, generateInterviewQuestions, explainProblem, startMockInterview,
    submitAnswer, getInterviewReport} = require("../controllers/aiController");
const router = express.Router();

router.post("/chat", authMiddleware, chatWithAI);
router.post("/interview-questions", authMiddleware, generateInterviewQuestions);
router.post("/explain/:id", authMiddleware, explainProblem);
router.post("/mock/start", authMiddleware, startMockInterview);
router.post("/mock/answer", authMiddleware, submitAnswer);
router.get("/mock/:sessionId", authMiddleware, getInterviewReport);

module.exports = router;