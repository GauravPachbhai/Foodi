import { z } from "zod";

export const ReviewSchema = z.object({
    userId: z.string(),
    restaurantId: z.string(),
    rating: z.number().min(1).max(5),
    comment: z.string().min(5).optional(),
    menuItemId: z.string().optional(), // Optional: Review for a specific menu item
    createdAt: z.date().default(() => new Date()),
  });
  