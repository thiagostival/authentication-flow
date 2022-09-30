import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { auth } from "../config/auth";
import { AppError } from "../errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token not present.", 401, "token.invalid");
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new AppError("Token not present.", 401, "token.invalid");
  }

  try {
    console.log("TOKEN >> ", token);
    const { sub: email } = verify(token, auth.secret_token) as IPayload;

    request.user = email;

    next();
  } catch (error) {
    throw new AppError("Token invalid.", 401, "token.expired");
  }
}
