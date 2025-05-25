"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Custom error class for handling application-specific errors
class AppError extends Error {
    constructor(statusCode, path, message, stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.path = path;
        this.statusCode = statusCode;
        this.path = path;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = AppError;
