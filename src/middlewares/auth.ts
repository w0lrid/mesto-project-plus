import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new Error("Not authorized"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, "secret");
    req.user = payload;
    return next();
  } catch (error) {
    return next(error);
  }
};

export default auth;