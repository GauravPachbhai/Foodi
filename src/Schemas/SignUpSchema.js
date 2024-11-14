import { z } from 'zod';

export const usernamevalidation = z
    .string()
    .min(2, " Username should be of atleast 2 Characters")
    .max(20, "Username should be no more than 20 Characters")
    .regex(/^[a-zA-Z0-9_]+$/, 'username must not contain special Characters')

export const SignUpSchema = z.object({

    username: usernamevalidation,
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "password must be atleast 6 chareacters" }),
    firstname: z.string().min(2, { message: "firstname must of atleast of 2 chareactes" }),
    lastname: z.string().min(2, { message: "lastname must be of atleast 2 characters" })
})