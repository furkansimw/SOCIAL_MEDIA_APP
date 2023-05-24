import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { checkSessions } from "../queries/mwQ";
import { clearCookies } from "../functions/tokenMwFunctions";
import { cookieSetter } from "../functions/authControllersFunctions";

const tokenMw = async (req: Request, res: Response, next: NextFunction) => {
  const { token, refreshid } = req.cookies;
  if (token) {
    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET || "") as {
        id: string;
      };
      res.locals.id = id;
      next();
    } catch (error) {
      console.log(error);
      if (
        error instanceof JsonWebTokenError &&
        error.message == "TokenExpiredError"
      ) {
        const { id } = jwt.decode(token) as { id: string };
        const ok = await checkSessions(id, refreshid);
        if (ok) {
          res.locals.id = id;
          cookieSetter(res, id, refreshid);
          next();
        } else clearCookies(res);
      } else clearCookies(res);
    }
  } else {
    res.locals.guest = true;
    next();
  }
};

export default tokenMw;
