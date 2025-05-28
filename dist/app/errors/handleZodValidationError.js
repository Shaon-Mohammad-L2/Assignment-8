"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodValidationError = (error) => {
    const errorSources = error.issues.map((issue) => {
        const removeFirstIndexFromPath = issue.path.slice(1);
        return {
            //       path: issues?.path[issues.path.length - 1],
            path: removeFirstIndexFromPath.join("/"), // full, readable path e.g. body.variants.0.sku
            message: issue.message,
        };
    });
    return {
        statusCode: 400,
        message: "Validation Error",
        errorSources,
    };
};
exports.default = handleZodValidationError;
