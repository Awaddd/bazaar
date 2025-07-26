import {
  Product,
  ProductApiResponse,
  ProductApiResponseSchema,
} from "./schema";

export function parseApiResponse(data: ProductApiResponse[]) {
  const validItems: Product[] = [];
  for (const item of data) {
    const result = ProductApiResponseSchema.safeParse(item);
    if (!result.success) {
      console.warn("Failed to parse item", result.error.format());
      continue;
    }

    validItems.push({
      ...item,
      gallery: processGalleryUrls(item.gallery),
      imageUrl: processImageUrl(item.imageUrl),
    });
  }
  return validItems;
}

export function processGalleryUrls(arr: string[]) {
  return arr.map((item) => processImageUrl(item));
}

export function processImageUrl(url: string) {
  return `${process.env.NEXT_PUBLIC_API_ENDPOINT}${url}`;
}
