const { ZodError } = require("zod");

const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    // Zod Validation Error
    if(err instanceof ZodError){
        return res.status(400).json({
            success: false,
            errors: err.issues
        });
    }

    // Mongo Duplicate Key
    if(err.code === 11000){
        return res.status(409).json({
            success: false,
            message: "Duplicate field value"
        });
    }

    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

module.exports = errorMiddleware;