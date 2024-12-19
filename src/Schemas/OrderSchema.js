import { z } from "zod";

export const OrderSchema = z.object({
  userId: z.string().nonempty("User ID is required"),
  restaurantId: z.string().nonempty("Restaurant ID is required"),
  menuItems: z.array(
    z.object({
      itemId: z.string().nonempty("Menu item ID is required"),
      name: z.string().nonempty("Menu item name is required"),
      quantity: z.number().min(1, "Quantity must be at least 1"),
      price: z.number().min(0, "Price must be a positive number"),
    })
  ).min(1, "Order must contain at least one menu item"),
  totalAmount: z.number().min(0, "Total amount must be a positive number"),
  orderStatus: z.enum(["pending", "accepted", "in-progress", "delivered", "cancelled"]),
  paymentMethod: z.enum(["credit_card", "paypal", "cash_on_delivery", "upi"]),
  deliveryAddress: z.object({
    street: z.string().min(5, "Street address must be at least 5 characters"),
    city: z.string().min(2, "City name must be at least 2 characters"),
    state: z.string().min(2, "State name must be at least 2 characters"),
    postalCode: z.string().regex(/^\d{5,6}$/, "Postal code must be 5-6 digits"),
    country: z.string().min(2, "Country name must be at least 2 characters"),
  }),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
  deliveryTime: z.string().optional(),
  placedAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const OrderStatusUpdateSchema = z.object({
  orderStatus: z.enum(["pending", "accepted", "in-progress", "delivered", "cancelled"]),
});
