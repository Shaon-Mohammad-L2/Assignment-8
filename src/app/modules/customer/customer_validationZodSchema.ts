import { z } from "zod";

const createCustomerValidationSchema = z.object({
  body: z.object(
    {
      name: z
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
      email: z
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

      phone: z
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
    },
    { required_error: "Body is required" }
  ),
});

// validation params
const getSingleCustomerID_ValidationSchema = z.object({
  params: z.object({
    id: z
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
const updateCustomerValidationSchema = z.object({
  params: z.object({
    id: z
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
  body: z.object(
    {
      name: z
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

      phone: z
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
    },
    { required_error: "Body is required" }
  ),
});
export const CustomerValidation = {
  createCustomerValidationSchema,
  getSingleCustomerID_ValidationSchema,
  updateCustomerValidationSchema,
};
