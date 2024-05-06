import { Schema } from "mongoose";

const user = new Schema(
  {
    name: { type: String, trim: true, max: 50 },
    email: { type: String, unique: true, trim: true, required: true },
    password: { type: String, trim: true, required: [true, "Password needed"] },
    role: { type: String, default: "user" },
    refreshToken: [],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default user;
