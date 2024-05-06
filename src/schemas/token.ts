import z from "zod";

const tokenSet = z.object({
  body: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
});

export const tokenSchema = { tokenSet };
