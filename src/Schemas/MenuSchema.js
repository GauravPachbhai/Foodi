import { z } from "zod";

export const MenuItemSchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().min(5).optional(),
    price: z.number().min(0),
    category: z.string().min(2), // e.g., Appetizers, Main Course
    available: z.boolean().default(true),
    imageUrl: z.string().url().optional(), // Optional: URL of the menu item image
    restaurantId: z.string(), // ID of the restaurant offering the item
  });
  