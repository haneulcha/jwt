import { NextFunction, Request, Response } from "express";
import { validateRequest } from "../validations";
import { userSchema } from "../schemas/user";
import { StatusCodes } from "http-status-codes";
import {
  getUserByEmail,
  replaceRefreshToken,
  saveUser,
} from "../services/user";
import {
  comparePassword,
  hashedPassword,
  generateToken,
  decodeToken,
  isRefreshTokenValid,
} from "../utils";
import { AppError } from "../utils/error";
import { tokenSchema } from "../schemas/token";

export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { data } = await validateRequest(req, tokenSchema.tokenSet);
  const { refreshToken } = data.body;

  try {
    const user = await decodeToken(refreshToken);
    const isValid = await isRefreshTokenValid(user._id, refreshToken);

    if (!isValid) {
      // TODO: error
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Refresh token is invalid",
      });
    }

    const newTokens = await generateToken(user);
    await replaceRefreshToken(user._id, refreshToken, newTokens.refreshToken);

    return res.status(StatusCodes.OK).json({
      message: "success",
      data: newTokens,
    });
  } catch (error) {
    return next(
      new AppError("Internal Server Error", StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
}
