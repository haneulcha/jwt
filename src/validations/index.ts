import { Request } from "express";
import z, { ZodObject, ZodRawShape } from "zod";

export async function validateRequest<T extends ZodObject<ZodRawShape>>(
  req: Request,
  schema: T
): Promise<{ data: z.infer<T>; error: null }> {
  try {
    const data = schema.parse(req.body);

    return { data, error: null };
  } catch (error: any) {
    throw error;
    // return { data: null, error };
  }
}
