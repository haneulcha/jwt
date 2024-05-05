import { NextFunction, Response, Request } from "express";
import { AnyZodObject, ZodError } from "zod";
import { StatusCodes } from "http-status-codes";

export function validate(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);

      // schema.parse({
      //   body: req.body,
      //   query: req.query,
      //   params: req.params,
      // });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          message: `${err.message} at ${err.path.join(".")}`,
        }));

        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid data", details: errors });
      }

      console.log("TODO: handle error");
      throw error;
    }
  };
}
