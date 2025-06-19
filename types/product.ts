export type Product = {
  id: number;
  name: string;
  price: number;
  brand: string;
  category: string;
  imageUrl: string;
  gallery: string[];
  sizes: {
    size: number;
    available?: boolean;
    default?: boolean;
  }[];
  description?: string;
  rating?: number;
  reviews?: number;
};
