import { revalidatePath } from "next/cache";

export const products = [
  {
    slug: "spinach-artichoke",
    name: "Spinach Artichoke Dip",
    price: "$11.99",
    image: "/images/tub-spinach-artichoke.png",
    description: "Blurb about product",
    reviewCount: 60,
  },
  {
    slug: "hummus",
    name: "Hummus Dip",
    price: "$11.99",
    image: "/images/tub-hummus.png",
    description: "Blurb about product",
    reviewCount: 72,
  },
  {
    slug: "mexican-street-corn",
    name: "Mexican Street Style Corn Dip",
    price: "$11.99",
    image: "/images/tub-mexican-corn.png",
    description: "Blurb about product",
    reviewCount: 45,
  },
];