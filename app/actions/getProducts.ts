"use server";

import { products } from "@/data/products";
import { Product } from "@/types/product";

type Params = {
  exclude?: number[];
  max?: number;
};

export default async function getProducts(data: Params = {}) {
  let items: Product[] = [...products];

  if (data?.exclude) {
    items = items.filter(
      (product) => !(data.exclude ?? []).includes(product.id)
    );
  }

  items = data?.max
    ? Array.from({
        length: data.max > items.length ? items.length : data.max,
      }).map((_, index) => items[index])
    : products;

  return items;
}
