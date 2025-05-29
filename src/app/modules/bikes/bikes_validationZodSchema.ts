import { z } from "zod";

const createBikeValidationZodSchema = z.object({
  body: z.object(
    {
      brand: z
        .string({
          required_error: "Brand is required",
        })
        .min(1, { message: "Brand is required" })
        .max(50, { message: "Brand must not exceed 50 characters" }),
      model: z
        .string({
          required_error: "Model is required",
        })
        .min(1, { message: "Model is required" })
        .max(70, { message: "Model must not exceed 70 characters" }),
      year: z
        .number({
          required_error: "Year is required",
        })
        .min(1900, { message: "Year must be up to 1900" })
        .max(2025, { message: "Year must be under 2025" }),
      customerId: z
        .string({
          required_error: "Customer ID is required",
        })
        .min(10, { message: "Customer ID must be at least 10 characters long" })
        .max(50, { message: "Customer ID must not exceed 50 characters" }),
    },
    { required_error: "Body is required" },
  ),
});

const getSingleBikeID_ValidationSchema = z.object({
  params: z.object({
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
  }),
});

export const BikeValidation = {
  createBikeValidationZodSchema,
  getSingleBikeID_ValidationSchema,
};
