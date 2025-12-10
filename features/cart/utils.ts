import {
  CartItem,
  CartItemApiResponse,
  CartItemApiResponseSchema,
} from "./schema";

export function parseCartResponse(data: CartItemApiResponse[]) {
  const validItems: CartItem[] = [];
  for (const item of data) {
    const result = CartItemApiResponseSchema.safeParse(item);
    if (!result.success) {
      console.warn("Failed to parse item", result.error.format());
      continue;
    }

    validItems.push({
      ...item,
      imageUrl: processImageUrl(item.imageUrl),
    });
  }
  return validItems;
}

export function processImageUrl(url: string) {
  return `${process.env.NEXT_PUBLIC_API_ENDPOINT}${url}`;
}
