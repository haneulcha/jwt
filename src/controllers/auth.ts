import { NextFunction, Request, Response } from "express";
import { validateRequest } from "../validations";
import { userSchema } from "../schemas/user";
import { StatusCodes } from "http-status-codes";
import { assignRefreshToken, getUserByEmail, saveUser } from "../services/user";
import { comparePassword, hashedPassword, generateToken } from "../utils";
import { AppError } from "../utils/error";

async function registerUser(req: Request, res: Response, next: NextFunction) {
  const { data } = await validateRequest(req, userSchema.register);
  const { email, password } = data.body;

  try {
    // if user exists
    const userExists = await getUserByEmail(email);
    if (userExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User already exists",
      });
    }
    // if password is hashed
    const hashed = await hashedPassword(password);
    if (!hashed) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
      });
    }
    // if user is saved
    const user = await saveUser({ email, password: hashed });

    res.status(StatusCodes.OK).json({
      message: "success",
      data: user.email,
    });
  } catch (error) {
    return next(
      new AppError("Internal Server Error", StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
}

async function logInUser(req: Request, res: Response, next: NextFunction) {
  const { data } = await validateRequest(req, userSchema.login);
  const { email, password } = data.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User does not exist",
      });
    }

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid password",
      });
    }

    const { accessToken, refreshToken } = await generateToken(user);
    await assignRefreshToken(user._id, refreshToken);

    res.status(StatusCodes.OK).json({
      message: "success",
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    return next(
      new AppError("Internal Server Error", StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
}

const userController = {
  registerUser,
  logInUser,
};

export { userController };
