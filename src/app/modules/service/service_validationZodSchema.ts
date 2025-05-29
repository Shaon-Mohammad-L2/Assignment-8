import { z } from "zod";

const createServiceValidationZodSchema = z.object({
  body: z.object({
    bikeId: z
      .string({
        required_error: "Bike ID is required",
      })
      .min(10, {
        message: "Bike ID must be at least 10 characters long",
      })
      .max(50, {
        message: "Bike ID must not exceed 50 characters",
      }),
    serviceDate: z
      .string({
        required_error: "Service date is required",
      })
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Service Date Invalid date format",
      }),
    description: z
      .string({
        required_error: "Description is required",
      })
      .min(1, { message: "Description is required" })
      .max(500, { message: "Description must not exceed 500 characters" }),
  }),
});

const getSingleServiceID_ValidationSchema = z.object({
  params: z.object({
    id: z
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

const updateSevice_ValidationSchema = z.object({
  params: z.object({
    id: z
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
  body: z.object({
    completionDate: z
      .string({
        required_error: "Completion date is required",
      })
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Completion Date Invalid date format",
      }),
  }),
});

export const ServiceValidation = {
  createServiceValidationZodSchema,
  getSingleServiceID_ValidationSchema,
  updateSevice_ValidationSchema,
};
