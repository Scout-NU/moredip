import type { ReactNode } from "react";

export const products = [
  {
    slug: "spinach-artichoke",
    name: "Spinach Artichoke Dip",
    price: "$11.99",
    image: "/images/tub-spinach-artichoke.png",
    description: "21g of protein per serving",
    reviewCount: 60,
    ingredients: (
      <>
        Cottage Cheese, Greek Yogurt, Cream Cheese, Spinach, Artichoke, Parmesan Cheese,
        Roasted Garlic, Contains 2% of less of: Salt, Extra Virgin Olive Oil.
        <br />
        <strong>Contains:</strong> Dairy.
        May contain traces of sesame.
      </>
    ),
    nutritionFacts: (
      <>
        SERVINGS: 3 per container, Size: 76g, Amount Per Serving: Calories
        90, Total Fat 5g (6% DV), Sat. Fat 3.5g (18% DV) , Trans Fat 0g,
        Cholest. 20mg (7% DV), Sodium 220mg (10% DV), Total Carb. 4g
        (1% DV), Fiber 1g (3% DV), Total Sugars 2g (Incl. 0g Added Sugars,
        0% DV), Protein 7g, Vit. D 0mcg (0% DV), Calcium 0mg (0% DV),
        Iron 0.2mg (2% DV), Potas. 40mg (0% DV).
      </>
    ),
  },
  {
    slug: "hummus",
    name: "Hummus Dip",
    price: "$11.99",
    image: "/images/tub-hummus.png",
    description: "Blurb about product",
    reviewCount: 72,
    ingredients: (
      <>
        Cottage Cheese, Chickpeas, Tahini, Roasted Garlic, Contains 2% or Less
        of: Salt, Extra Virgin Olive Oil.
        <br />
        <strong>Contains:</strong> Dairy, Sesame.
      </>
    ),
    nutritionFacts: (
      <>
        SERVINGS: 3 per container, Size: 76g, Amount Per Serving: Calories
        120, Total Fat 6g (8% DV), Sat. Fat 1.5g (8% DV), Trans Fat 0g,
        Cholest. {"<5mg"} (1% DV), Sodium 150mg (7% DV), Total Carb. 11g
        (4% DV), Fiber 2g (7% DV), Total Sugars 1g (Incl. 0g Added Sugars,
        0% DV), Protein 7g, Vit. D 0mcg (0% DV), Calcium 20mg (2% DV),
        Iron 0.2mg (2% DV), Potas. 50mg (2% DV).
      </>
    ),
  },
  {
    slug: "mexican-street-corn",
    name: "Mexican Street Style Corn Dip",
    price: "$11.99",
    image: "/images/tub-mexican-corn.png",
    description: "Blurb about product",
    reviewCount: 45,
    ingredients: (
      <>
        Corn, Greek Yogurt, Onion, Parmesan Cheese, Hot Sauce, Contains 2% or Less
        of: Paprika and Chili Powder.
        <br />
        <strong>Contains:</strong> Dairy.
        May contain traces of sesame.
      </>
    ),
    nutritionFacts: (
      <>
        SERVINGS: 3 per container, Size: 76g, Amount Per Serving: Calories 
        90, Total Fat 4.5g (6% DV), Sat. Fat 2.5g (13% DV) , Trans Fat 0g,
        Cholest. 15mg (5% DV), Sodium 230mg (10% DV), Total Carb. 5g
        (2% DV), Fiber 0g (0% DV), Total Sugars 3g (Incl. 0g Added Sugars,
        0% DV), Protein 7g, Vit. D 0mcg (0% DV), Calcium 0mg (0% DV),
        Iron 0mg (0% DV), Potas. 0mg (0% DV).
      </>
    ),
  },
];
