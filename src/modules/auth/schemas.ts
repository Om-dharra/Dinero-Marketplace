import z from 'zod';
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()

})
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(63, { message: 'Username must be at most 63 characters long' })
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "UserName can only contain lowercase letters, numbers, and hyphens, and must start and end with a letter or number."
    )
    .refine(
      (val) => !val.includes(" "), {
      message: "Username cannot contain spaces"
    })
    .transform((val) => val.toLowerCase())
})
