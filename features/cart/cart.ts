import {
  CartItem,
  CartItemApiResponse,
  CartItemApiResponseSchema,
} from "./schema";
import { parseCartResponse, processImageUrl } from "./utils";

const base = ["cart"];

export default {
  list: () => ({
    queryKey: [...base, "list"] as const,
    queryFn: () => fetchCartItems(),
  }),
  add: () => ({
    mutationFn: ({ productId, size, quantity }: { productId: number; size: number; quantity: number }) =>
      addCartItem(productId, size, quantity),
  }),
  update: () => ({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      updateCartItem(id, quantity),
  }),
  remove: () => ({
    mutationFn: (id: number) => removeCartItem(id),
  }),
};

async function fetchCartItems() {
  const url = new URL("/api/cart", process.env.NEXT_PUBLIC_SITE_URL);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Failed to fetch data, response: ${err}`);
    }

    const data = (await response.json()) as CartItemApiResponse[];
    return parseCartResponse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function addCartItem(productId: number, size: number, quantity: number): Promise<CartItem | null> {
  const url = new URL("/api/cart", process.env.NEXT_PUBLIC_SITE_URL);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, size, quantity }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Failed to add item to cart, response: ${err}`);
    }

    const data = (await response.json()) as CartItemApiResponse;
    const result = CartItemApiResponseSchema.safeParse(data);

    if (!result.success) {
      throw new Error(`Failed to parse item ${result.error.format()}`);
    }

    return {
      ...data,
      imageUrl: processImageUrl(data.imageUrl),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function updateCartItem(id: number, quantity: number): Promise<CartItem | null> {
  const url = new URL(`/api/cart/${id}`, process.env.NEXT_PUBLIC_SITE_URL);

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Failed to update cart item, response: ${err}`);
    }

    const data = (await response.json()) as CartItemApiResponse;
    const result = CartItemApiResponseSchema.safeParse(data);

    if (!result.success) {
      throw new Error(`Failed to parse item ${result.error.format()}`);
    }

    return {
      ...data,
      imageUrl: processImageUrl(data.imageUrl),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function removeCartItem(id: number): Promise<boolean> {
  const url = new URL(`/api/cart/${id}`, process.env.NEXT_PUBLIC_SITE_URL);

  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Failed to remove cart item, response: ${err}`);
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
