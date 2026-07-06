const express=require("express");
const router=express.Router();

const resumeController=require("../controllers/resumeController");
const protect=require("../middleware/authMiddleware");
const upload=require("../middleware/uploadMiddleware");

router.post(
    "/upload",
    protect,
    upload.single("resume"),
    resumeController.upload
);

router.get(
    "/analysis",
    protect,
    resumeController.getResumeAnalysis
);

module.exports=router;