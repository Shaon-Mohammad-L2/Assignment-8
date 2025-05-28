import { ZodError, ZodIssue } from "zod";
import { TGenericErrorResponse } from "../interface/errors";

const handleZodValidationError = (error: ZodError): TGenericErrorResponse => {
  const errorSources = error.issues.map((issue: ZodIssue) => {
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

export default handleZodValidationError;
