import {
  Product,
  ProductApiResponse,
  ProductApiResponseSchema,
} from "./schema";
import { parseApiResponse, processGalleryUrls, processImageUrl } from "./utils";

type Params = {
  limit?: number;
  page?: number;
  exclude?: number;
  // Filter params
  brands?: string;
  minPrice?: string;
  maxPrice?: string;
  sizes?: string;
  search?: string;
  sort?: string;
};

const base = ["products"];

export default {
  list: (options: Params = {}) => ({
    queryKey: [...base, "list", options] as const,
    queryFn: () => fetchProducts(options),
  }),
  get: (id: number) => ({
    queryKey: [...base, "get", id] as const,
    queryFn: () => fetchProductById(id),
  }),
};

async function fetchProducts(params: Params = {}) {
  const start = performance.now();
  const url = new URL("/api/products", process.env.NEXT_PUBLIC_SITE_URL);

  if (params.limit !== undefined) {
    url.searchParams.append("limit", params.limit.toString());
  }

  if (params.page !== undefined) {
    url.searchParams.append("page", params.page.toString());
  }

  if (params.exclude !== undefined) {
    url.searchParams.append("exclude", params.exclude.toString());
  }

  // Filter params
  if (params.brands) {
    url.searchParams.append("brands", params.brands);
  }

  if (params.minPrice) {
    url.searchParams.append("minPrice", params.minPrice);
  }

  if (params.maxPrice) {
    url.searchParams.append("maxPrice", params.maxPrice);
  }

  if (params.sizes) {
    url.searchParams.append("sizes", params.sizes);
  }

  if (params.search) {
    url.searchParams.append("search", params.search);
  }

  if (params.sort) {
    url.searchParams.append("sort", params.sort);
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Failed to fetch data, response: ${err}`);
    }

    const duration = performance.now() - start;
    console.log(`Frontend fetch took ${duration}ms`);

    const data = (await response.json()) as ProductApiResponse[];
    return parseApiResponse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function fetchProductById(id: number): Promise<Product | null> {
  const url = new URL(`/api/products/${id}`, process.env.NEXT_PUBLIC_SITE_URL);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Failed to fetch data, response: ${err}`);
    }

    const data = (await response.json()) as ProductApiResponse;
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
