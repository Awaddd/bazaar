import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Nike AF 1 Off-White",
    price: 199.0,
    category: "Sneakers",
    brand: "Nike",
    imageUrl:
      "https://images.pexels.com/photos/18375077/pexels-photo-18375077/free-photo-of-sneakers-in-a-shoe-store.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    gallery: [
      "https://images.pexels.com/photos/18375077/pexels-photo-18375077/free-photo-of-sneakers-in-a-shoe-store.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6540993/pexels-photo-6540993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/13408853/pexels-photo-13408853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    sizes: [
      {
        size: 6,
        available: false,
      },
      {
        size: 7,
        available: false,
      },
      {
        size: 8,
        available: true,
      },
      {
        size: 9,
        available: true,
        default: true,
      },
      {
        size: 10,
        available: true,
      },
      {
        size: 11,
        available: true,
      },
      {
        size: 12,
        available: true,
      },
    ],
  },
  {
    id: 2,
    name: "Jordan 1 Cool Gray",
    price: 149.0,
    category: "Sneakers",
    brand: "Jordan",
    imageUrl: "/assets/jordan-1-gray.webp",
    gallery: [
      "/assets/jordan-1-gray.webp",
      "/assets/jordan-1-gray-2.webp",
      "/assets/jordan-1-gray-3.jpg",
    ],
    sizes: [
      {
        size: 6,
        available: true,
      },
      {
        size: 7,
        available: true,
      },
      {
        size: 8,
        available: true,
        default: true,
      },
      {
        size: 9,
        available: true,
      },
      {
        size: 10,
        available: false,
      },
      {
        size: 11,
        available: false,
      },
    ],
  },
  {
    id: 3,
    name: "Jordan 1",
    price: 179.0,
    category: "Sneakers",
    brand: "Jordan",
    imageUrl:
      "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    gallery: [
      "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6540993/pexels-photo-6540993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/13408853/pexels-photo-13408853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    sizes: [
      {
        size: 6,
        available: true,
      },
      {
        size: 7,
        available: true,
      },
      {
        size: 8,
        available: true,
        default: true,
      },
      {
        size: 9,
        available: true,
      },
      {
        size: 10,
        available: true,
      },
      {
        size: 11,
        available: false,
      },
    ],
  },
  {
    id: 4,
    name: "Yeezys",
    price: 220.0,
    category: "Sneakers",
    brand: "Adidas",
    imageUrl:
      "https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    gallery: [
      "https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6540993/pexels-photo-6540993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/13408853/pexels-photo-13408853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    sizes: [
      {
        size: 6,
        available: true,
      },
      {
        size: 7,
        available: true,
      },
      {
        size: 8,
        available: true,
        default: true,
      },
      {
        size: 9,
        available: true,
      },
      {
        size: 10,
        available: true,
      },
      {
        size: 11,
        available: true,
      },
    ],
  },
  {
    id: 5,
    name: "Jordan 1 Blue High Top",
    price: 199.0,
    category: "Sneakers",
    brand: "Jordan",
    imageUrl:
      "https://images.pexels.com/photos/1070360/pexels-photo-1070360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    gallery: [
      "https://images.pexels.com/photos/1070360/pexels-photo-1070360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6540993/pexels-photo-6540993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/13408853/pexels-photo-13408853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    sizes: [
      {
        size: 6,
        available: true,
      },
      {
        size: 7,
        available: true,
      },
      {
        size: 8,
        available: true,
        default: true,
      },
      {
        size: 9,
        available: true,
      },
      {
        size: 10,
        available: false,
      },
      {
        size: 11,
        available: false,
      },
    ],
  },
  {
    id: 6,
    name: "Classic Sneakers",
    price: 89.0,
    category: "Casual",
    brand: "Generic",
    imageUrl:
      "https://images.pexels.com/photos/1750045/pexels-photo-1750045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    gallery: [
      "https://images.pexels.com/photos/1750045/pexels-photo-1750045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6540993/pexels-photo-6540993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/13408853/pexels-photo-13408853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    sizes: [
      {
        size: 6,
        available: true,
      },
      {
        size: 7,
        available: true,
      },
      {
        size: 8,
        available: true,
        default: true,
      },
      {
        size: 9,
        available: true,
      },
      {
        size: 10,
        available: true,
      },
      {
        size: 11,
        available: true,
      },
    ],
  },
  {
    id: 7,
    name: "Converse All Star",
    price: 75.0,
    category: "Casual",
    brand: "Converse",
    imageUrl:
      "https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    gallery: [
      "https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6540993/pexels-photo-6540993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/13408853/pexels-photo-13408853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    sizes: [
      {
        size: 6,
        available: true,
      },
      {
        size: 7,
        available: true,
      },
      {
        size: 8,
        available: true,
        default: true,
      },
      {
        size: 9,
        available: true,
      },
      {
        size: 10,
        available: true,
      },
      {
        size: 11,
        available: true,
      },
    ],
  },
];
