const { z } = require("zod");

const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(30, "Name cannot exceed 30 characters"),

    email: z.email("Invalid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters"),
});

const loginSchema = z.object({
    email: z.email("Invalid Email"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
});

module.exports = { registerSchema, loginSchema };