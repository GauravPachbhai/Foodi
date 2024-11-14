import { z } from 'zod';

export const restaurantValidation = z
  .string()
  .min(2, "Restaurant name should be at least 2 characters long")
  .max(50, "Restaurant name should be no more than 50 characters");

export const phoneNumberValidation = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format");

export const RestaurantSignUpSchema = z.object({
  username: z
    .string()
    .min(2, "Username should be at least 2 characters long")
    .max(20, "Username should be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters"),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  firstname: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastname: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  restaurantName: restaurantValidation,
  phoneNumber: phoneNumberValidation,
  address: z.string().min(5, { message: "Address must be at least 5 characters long" }),
  city: z.string().min(2, { message: "City must be at least 2 characters long" }),
  country: z.string().min(2, { message: "Country must be at least 2 characters long" })
});
