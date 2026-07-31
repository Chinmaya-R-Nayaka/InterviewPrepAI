const express = require("express");
const router = express.Router();

const resumeController = require("../controllers/resumeController");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/upload", protect, upload.single("resume"), resumeController.upload);
router.get("/analysis", protect, resumeController.getResumeAnalysis);
router.get("/history", authMiddleware, resumeController.getResumeHistory);
router.delete("/:id", authMiddleware, resumeController.deleteResume);

module.exports = router;