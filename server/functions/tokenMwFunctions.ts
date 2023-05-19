import { Response } from "express";

const clearCookies = (res: Response) => {
  res.clearCookie("isloggedin");
  res.clearCookie("refreshid");
  res.clearCookie("token");
  res.status(401).json({ message: "Unauthorized" });
};

export { clearCookies };
