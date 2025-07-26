import {
  Product,
  ProductApiResponse,
  ProductApiResponseSchema,
} from "./schema";
import { parseApiResponse, processGalleryUrls, processImageUrl } from "./utils";

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
  get: (id: number) => ({
    queryKey: [...base, "get"] as const,
    queryFn: () => fetchProductById(id),
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

async function fetchProductById(id: number): Promise<Product | null> {
  const url = new URL(
    `/api/products/${id}`,
    process.env.NEXT_PUBLIC_API_ENDPOINT
  );

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Failed to fetch data, response: ${err}`);
    }

    const data = (await response.json()) as ProductApiResponse;
    console.log("raw response", data);

    const result = ProductApiResponseSchema.safeParse(data);

    if (!result.success) {
      throw new Error(`Failed to parse item ${result.error.format()}`);
    }

    return {
      ...data,
      imageUrl: processImageUrl(data.imageUrl),
      gallery: processGalleryUrls(data.gallery),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
