import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

const generateToken = async (user: any) => {
  const accessToken = jwt.sign(user, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  });
  const refreshToken = jwt.sign(user, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  });
  return { accessToken, refreshToken };
};

export { hashedPassword, comparePassword, generateToken };
