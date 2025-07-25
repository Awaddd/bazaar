import {
  Product,
  ProductApiResponse,
  ProductApiResponseSchema,
} from "./schema";

const base = ["products"];

export default {
  list: () => ({
    queryKey: [...base, "list"] as const,
    queryFn: fetchProducts,
  }),
};

async function fetchProducts() {
  const url = new URL("/api/products", process.env.NEXT_PUBLIC_API_ENDPOINT);
  console.log("fetching at url", url);

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
    throw error;
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

    validItems.push(item);
  }
}
