export const PaymentSchema = z.object({
    orderId: z.string(),
    amount: z.number().min(0),
    paymentMethod: z.enum(['credit_card', 'paypal', 'cash_on_delivery']),
    paymentStatus: z.enum(['pending', 'completed', 'failed']),
    transactionId: z.string().optional(),
    paymentDate: z.date().default(() => new Date()),
  });
  