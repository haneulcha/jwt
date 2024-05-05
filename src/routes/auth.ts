import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => {
  res.send("sign-up");
});

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
