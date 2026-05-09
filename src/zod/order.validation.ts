import { z } from "zod";

export const orderSchema = z.object({
   name: z.string().min(1, "Name is required"),
   email: z.string().min(1, "Email is required").email("Invalid email address"),
   phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^[+\d\s-]{8,}$/),
   company: z.string().optional(),
   address: z.string().min(1, "Address is required"),
   productId: z.string(),
});

export type OrderData = z.infer<typeof orderSchema>;
