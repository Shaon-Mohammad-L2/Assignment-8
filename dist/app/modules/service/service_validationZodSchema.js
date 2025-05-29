"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require("zod");
const createServiceValidationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        bikeId: zod_1.z
            .string({
            required_error: "Bike ID is required",
        })
            .min(10, {
            message: "Bike ID must be at least 10 characters long",
        })
            .max(50, {
            message: "Bike ID must not exceed 50 characters",
        }),
        serviceDate: zod_1.z
            .string({
            required_error: "Service date is required",
        })
            .refine((date) => !isNaN(Date.parse(date)), {
            message: "Service Date Invalid date format",
        }),
        description: zod_1.z
            .string({
            required_error: "Description is required",
        })
            .min(1, { message: "Description is required" })
            .max(500, { message: "Description must not exceed 500 characters" }),
    }),
});
const getSingleServiceID_ValidationSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z
            .string({
            required_error: "Service ID is required",
        })
            .min(10, {
            message: "Service ID must be at least 10 characters long",
        })
            .max(50, {
            message: "Service ID must not exceed 50 characters",
        }),
    }),
});
const updateSevice_ValidationSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z
            .string({
            required_error: "Service ID is required",
        })
            .min(10, {
            message: "Service ID must be at least 10 characters long",
        })
            .max(50, {
            message: "Service ID must not exceed 50 characters",
        }),
    }),
    body: zod_1.z.object({
        completionDate: zod_1.z
            .string({
            required_error: "Completion date is required",
        })
            .refine((date) => !isNaN(Date.parse(date)), {
            message: "Completion Date Invalid date format",
        }),
    }),
});
exports.ServiceValidation = {
    createServiceValidationZodSchema,
    getSingleServiceID_ValidationSchema,
    updateSevice_ValidationSchema,
};
