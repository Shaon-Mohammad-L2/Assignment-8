import { AnyZodObject } from "zod";
import catchAsync from "../shared/catchAsync";

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
      params: req.params,
    });
    next();
  });
};

export default validateRequest;
