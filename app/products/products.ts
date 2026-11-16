import { revalidatePath } from "next/cache";

export const products = [
  {
    slug: "spinach-artichoke",
    name: "Spinach Artichoke",
    price: "$11.99",
    image: "/images/tub-spinach-artichoke.png",
    description: "Blurb about product",
    reviewCount: 60,
  },
  {
    slug: "hummus",
    name: "Hummus",
    price: "$11.99",
    image: "/images/tub-hummus.png",
    description: "Blurb about product",
    reviewCount: 72,
  },
  {
    slug: "mexican-street-corn",
    name: "Mexican Street Corn",
    price: "$11.99",
    image: "/images/tub-mexican-corn.png",
    description: "Blurb about product",
    reviewCount: 45,
  },
];