import { z } from "zod";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const register = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8).regex(passwordValidation, {
      message:
        "Password must contain 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
    }),
  }),
});

const login = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8).regex(passwordValidation, {
      message:
        "Password must contain 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
    }),
  }),
});

export const userSchema = {
  register,
  login,
};
