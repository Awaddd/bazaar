import z from "zod";

export const CartItemApiResponseSchema = z.object({
  id: z.number(),
  productId: z.number(),
  productName: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  size: z.number(),
  quantity: z.number(),
});

export type CartItemApiResponse = {
  id: number;
  productId: number;
  productName: string;
  price: number;
  imageUrl: string;
  size: number;
  quantity: number;
};

export type CartItem = CartItemApiResponse;
