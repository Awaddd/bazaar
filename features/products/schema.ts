import z from "zod";

export const ProductApiResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  brand: z.string(),
  category: z.string(),
  imageUrl: z.string().url(),
  gallery: z.array(z.string().url()),
  sizes: z.array(
    z.object({
      size: z.number(),
      available: z.boolean().optional(),
      default: z.boolean().optional(),
    })
  ),
  description: z.string().optional(),
  rating: z.number().optional(),
  reviews: z.number().optional(),
});

export type ProductApiResponse = {
  id: number;
  name: string;
  price: number;
  description: string;
  brand: string;
  category: string;
  careInstructions: string;
  imageUrl: string;
  gallery: string[];
  features: string[];
  sizes: {
    size: number;
    available?: boolean;
    default?: boolean;
  }[];
};

export type Product = ProductApiResponse & {
  rating?: number;
  reviews?: number;
};
