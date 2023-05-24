import jwt from "jsonwebtoken";
import { Response } from "express";

const cookieSetter = (res: Response, id: string, refreshid: string) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET || "-", {
    expiresIn: "2h",
  });

  const maxAge = 1000 * 60 * 60 * 24 * 365;
  const httpOnly = true;

  res.cookie("isloggedin", true, { maxAge });
  res.cookie("token", token, { maxAge, httpOnly });
  res.cookie("refreshid", refreshid, { maxAge, httpOnly });
};

export { cookieSetter };
