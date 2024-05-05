import { Request, Response } from "express";
import { validateRequest } from "../validations";
import { userSchema } from "../schemas/user";
import { StatusCodes } from "http-status-codes";
// create new user

async function registerUser(req: Request, res: Response) {
  const { data } = await validateRequest(req, userSchema.register);
  const { email, password } = data;

  res.status(StatusCodes.OK).json({
    message: "success",
  });
}

// generate a new user

// generate a token

// remove the token

const userController = {
  registerUser,
};

export { userController };
