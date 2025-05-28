"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerValidation = void 0;
const zod_1 = require("zod");
const createCustomerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name is required",
        })
            .min(3, {
            message: "Name must be at least 3 characters long",
        })
            .max(70, {
            message: "Name must not exceed 70 characters",
        })
            .regex(/^[A-Za-z\s]+$/, {
            message: "Name must contain only letters",
        }),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .min(3, {
            message: "Email must be at least 3 characters long",
        })
            .max(70, {
            message: "Email must not exceed 70 characters",
        })
            .email({
            message: "Invalid email address",
        }),
        phone: zod_1.z
            .string({
            required_error: "Phone number is required",
        })
            .min(9, {
            message: "Phone number must be at least 9 characters long",
        })
            .max(14, { message: "Phone number must not exceed 14 characters" })
            // .length(11, {
            //   message: "Phone number must be exactly 11 characters long",
            // })
            .regex(/^[0-9--]+$/, {
            message: "Phone number must contain only numbers",
        }),
    }, { required_error: "Body is required" }),
});
// validation params
const getSingleCustomerID_ValidationSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z
            .string({
            required_error: "Customer ID is required",
        })
            .min(10, {
            message: "Customer ID must be at least 10 characters long",
        })
            .max(50, {
            message: "Customer ID must not exceed 50 characters",
        }),
    }),
});
// customer update validation schema
const updateCustomerValidationSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z
            .string({
            required_error: "Customer ID is required",
        })
            .min(10, {
            message: "Customer ID must be at least 10 characters long",
        })
            .max(50, {
            message: "Customer ID must not exceed 50 characters",
        }),
    }),
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name is required",
        })
            .min(3, {
            message: "Name must be at least 3 characters long",
        })
            .max(70, {
            message: "Name must not exceed 70 characters",
        })
            .regex(/^[A-Za-z\s]+$/, {
            message: "Name must contain only letters",
        })
            .optional(),
        phone: zod_1.z
            .string({
            required_error: "Phone number is required",
        })
            .min(9, {
            message: "Phone number must be at least 9 characters long",
        })
            .max(14, { message: "Phone number must not exceed 14 characters" })
            // .length(11, {
            //   message: "Phone number must be exactly 11 characters long",
            // })
            .regex(/^[0-9--]+$/, {
            message: "Phone number must contain only numbers",
        })
            .optional(),
    }, { required_error: "Body is required" }),
});
exports.CustomerValidation = {
    createCustomerValidationSchema,
    getSingleCustomerID_ValidationSchema,
    updateCustomerValidationSchema,
};
