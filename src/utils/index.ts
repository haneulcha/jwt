import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { type User } from "../mongo/model";
import { findRefreshToken, removeRefreshTokens } from "../services/user";
import { Types } from "mongoose";

const SALT = 10;

const hashedPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(SALT);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  } catch (error) {
    console.log("utils/hashedPassword", error);
    return null;
  }
};

const comparePassword = async (password: string, hashedPassword: string) => {
  try {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  } catch (error) {
    console.log("utils/comparePassword", error);
    return false;
  }
};

const generateToken = async (user: User) => {
  const accessToken = jwt.sign(user, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  });
  const refreshToken = jwt.sign(user, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  });
  return { accessToken, refreshToken };
};

const decodeToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as User;
  } catch (error) {
    console.log("utils/decodeToken", error);
    throw error;
  }
};

const isRefreshTokenValid = async (
  id: Types.ObjectId,
  refreshToken: string
) => {
  try {
    const user = await findRefreshToken(id, refreshToken);
    if (!user) {
      // not in db
      await removeRefreshTokens(id);
      return null;
    }
    return user;
  } catch (error) {
    console.log("utils/isRefreshTokenValid", error);
    return null;
  }
};

export {
  hashedPassword,
  comparePassword,
  generateToken,
  decodeToken,
  isRefreshTokenValid,
};
