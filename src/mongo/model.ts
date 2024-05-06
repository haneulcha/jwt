import mongoose, { Types } from "mongoose";
import userSchema from "./user/schema";

const userModel = mongoose.model("User", userSchema);

type User = {
  name?: string;
  email: string;
  password: string;
  role?: string;
  refreshToken: string[];
  _id: Types.ObjectId;
};

export { userModel, User };
