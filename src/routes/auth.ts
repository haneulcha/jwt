import { Router } from "express";
import { validate } from "../middleware";
import { userSchema } from "../schemas/user";
import { userController } from "../controllers/auth";

const authRouter = Router();

authRouter.post(
  "/sign-up",
  validate(userSchema.register),
  userController.registerUser
);

authRouter.post("/login", (req, res) => {
  res.send("login");
});

authRouter.get("/refresh", (req, res) => {
  res.send("refresh");
});

authRouter.get("/logout", (req, res) => {
  res.send("logout");
});

export { authRouter };
