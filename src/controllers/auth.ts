import { NextFunction, Request, Response } from "express";
import { validateRequest } from "../validations";
import { userSchema } from "../schemas/user";
import { StatusCodes } from "http-status-codes";
import { getUserByEmail, saveUser } from "../services/user";
import { hashedPassword } from "../utils";
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

// generate a token

// remove the token

const userController = {
  registerUser,
};

export { userController };
