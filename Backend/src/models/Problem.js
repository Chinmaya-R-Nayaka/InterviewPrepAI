const mongoose = require("mongoose");
const { Schema } = mongoose;

const problemSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    platform: {
        type: String,
        required: true,
        trim: true,
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true,
    },
    topic: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["Todo", "Attempted", "Solved"],
        default: "Todo",
    },
    notes: {
        type: String,
        default: "",
    },
    revisionDate: {
        type: Date,
    },
    link: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {timestamps: true,});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;