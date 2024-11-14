import { z } from "zod";

export const OrderSchema = z.object({
    userId: z.string(),
    restaurantId: z.string(),
    orderItems: z.array(z.object({
      itemId: z.string(),
      quantity: z.number().min(1),
      price: z.number().min(0),
    })),
    totalAmount: z.number().min(0),
    orderStatus: z.enum(['pending', 'confirmed', 'delivered', 'cancelled']),
    paymentMethod: z.enum(['credit_card', 'paypal', 'cash_on_delivery', "upi"]),
    deliveryAddress: z.string().min(5),
    phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/),
    deliveryTime: z.string().optional(),
    placedAt: z.date().default(() => new Date()),
  });
  