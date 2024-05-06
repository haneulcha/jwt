import { type Types } from "mongoose";
import { userModel } from "../mongo/model";

const getUserByEmail = async (email: string) => {
  const user = await userModel.findOne({ email });
  return user;
};

type UserPayload = {
  name?: string;
  email: string;
  password: string;
  role?: string;
  refreshToken?: string;
};

const saveUser = async (userPayload: UserPayload) => {
  const user = new userModel(userPayload);
  return user.save();
};

const assignRefreshToken = async (id: Types.ObjectId, refreshToken: string) => {
  const user = await userModel.updateOne(
    { _id: id },
    { $push: { refreshTokens: refreshToken } }
  );

  return user;
};

export { getUserByEmail, saveUser, assignRefreshToken };
