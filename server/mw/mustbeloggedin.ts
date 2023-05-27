import { NextFunction, Request, Response } from "express";

const mustBeLoggedin = (req: Request, res: Response, next: NextFunction) => {
  const { guest } = res.locals;
  if (guest) res.status(403).json({ message: "Forbidden" });
  next();
};

export default mustBeLoggedin;
