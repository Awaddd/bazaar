import {
  Product,
  ProductApiResponse,
  ProductApiResponseSchema,
} from "./schema";

type Params = {
  exclude?: number[];
  max?: number;
};

const base = ["products"];

export default {
  list: (options: Params = {}) => ({
    queryKey: [...base, "list"] as const,
    queryFn: () => fetchProducts(options),
  }),
};

async function fetchProducts(params: Params = {}) {
  const url = new URL("/api/products", process.env.NEXT_PUBLIC_API_ENDPOINT);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Failed to fetch data, response: ${err}`);
    }

    const data = (await response.json()) as ProductApiResponse[];
    console.log("raw response", data);
    return parseApiResponse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

function parseApiResponse(data: ProductApiResponse[]) {
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

function processGalleryUrls(arr: string[]) {
  return arr.map((item) => processImageUrl(item));
}

function processImageUrl(url: string) {
  return `${process.env.NEXT_PUBLIC_API_ENDPOINT}${url}`;
}
