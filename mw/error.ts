import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "pg";

class CustomError extends Error {
  message: string;
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

const createError = (message: string, status?: number) => {
  if (!status) status = 400;
  throw new CustomError(message, status);
};

const badRequest = () => createError("Bad request", 400);

const routeNotFound = (req: Request, res: Response) =>
  res.status(404).json({ message: "Route not found" });

const asyncErrorWrapper =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.status).json({ message: err.message });
  } else if (err instanceof DatabaseError) {
    if (err.code == "23505") {
      let message = "Internal Server Error";
      if (err.detail) message = parser(err.detail);
      return res.status(500).json({ message });
    } else {
      const message = err.message || "Internal Server Error";
      return res.status(500).json({ message });
    }
  } else {
    const message = err.message || "Internal Server Error";
    res.status(500).json({ message });
  }
};

const parser = (str: string) =>
  str.split("=")[1].replace(")", "").replace("(", "");

export {
  createError,
  badRequest,
  errorHandler,
  routeNotFound,
  asyncErrorWrapper,
};
