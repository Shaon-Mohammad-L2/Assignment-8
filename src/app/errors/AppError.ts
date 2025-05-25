// Custom error class for handling application-specific errors
export default class AppError extends Error {
  constructor(
    public statusCode: number,
    public path: string,
    message: string,
    stack = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.path = path;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
