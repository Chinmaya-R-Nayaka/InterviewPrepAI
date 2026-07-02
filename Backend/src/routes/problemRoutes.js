const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addProblem, getAllProblems, getProblem, updateProblem, deleteProblem } = require("../controllers/problemController");
const router = express.Router();

router.post("/", authMiddleware, addProblem);
router.get("/", authMiddleware, getAllProblems); // fetches all problems
router.get("/:id", authMiddleware, getProblem); // fetch single problem
router.put("/:id", authMiddleware, updateProblem);
router.delete("/:id", authMiddleware, deleteProblem);

module.exports = router;