const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addProblem } = require("../controllers/problemController");
const router = express.Router();

router.post("/", authMiddleware, addProblem);

module.exports = router;