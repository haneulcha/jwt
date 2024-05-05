import express, { Express, Request, Response } from "express";
import { configDotenv } from "dotenv";
import { connectDB } from "./config/db";
import { authRouter } from "./routes/auth";

const app: Express = express();
const port = 8080;

app.use(express.json());

app.use("/api/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("hihi");
});

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server on`);
  });
});
