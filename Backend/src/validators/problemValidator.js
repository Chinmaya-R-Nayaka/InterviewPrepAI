const { z } = require("zod");

const problemSchema = z.object({
    title: z.string().min(1),
    platform: z.string().min(1),
    difficulty: z.enum(["Easy", "Medium", "Hard"]),
    topic: z.string().min(1),
    status: z.enum(["Todo", "Attempted", "Solved"]).optional(),
    notes: z.string().optional(),
    revisionDate: z.string().optional(),
    link: z.string().url(),
});

module.exports = {problemSchema};