import { products } from "@/data/products";

export default async function (id: string) {
  return products.find((item) => item.id === parseInt(id));
}
