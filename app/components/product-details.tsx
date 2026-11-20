
"use client";

import { useState } from "react";
import Image from "next/image";

type Product = {
  name: string;
  price: string;
  description: string;
  image: string;
  rating?: number;
  reviewCount?: number;
  protein?: string;
  macros?: string;
  ingredients?: string;
  nutritionFacts?: string;
};

export default function ProductDetail({
  product,
}: {
  product: Product;
}) {
  const [selectedOption, setSelectedOption] = useState("8 oz");
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections((current) =>
      current.includes(section)
        ? current.filter((item) => item !== section)
        : [...current, section]
    );
  };

  const sections = [
    { title: "Ingredients", content: product.ingredients },
    {
      title: "Nutritional Facts",
      content: product.nutritionFacts,
    },
  ];

  return (
    <main className="product-detail-page">
      <section className="product-detail">
        <div className="product-detail-image">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 700px) 90vw, 50vw"
            className="detail-image"
          />
        </div>

        <div className="product-detail-info">
          <div className="product-rating">
            <span>★★★★★</span>
            <small>({product.reviewCount ?? 45})</small>
          </div>

          <h1>{product.name}</h1>

          <p className="detail-price">{product.price}</p>

          <p className="detail-description">
            {product.protein ?? product.description}
          </p>

          <div className="product-options">
            <button
                type="button"
                className={selectedOption === "8 oz" ? "selected" : ""}
                onClick={() => setSelectedOption("8 oz")}
            >
                8 oz
            </button>

            <button
                type="button"
                className={selectedOption === "2 Pack" ? "selected" : ""}
                onClick={() => setSelectedOption("2 Pack")}
            >
                2 Pack
            </button>
          </div>

          <button
            className="add-to-cart"
            onClick={() => {
                console.log("Add to cart:", {
                    product: product.name,
                    option: selectedOption,
                });
            }}
          >
            ADD TO CART
          </button>
        </div>
      </section>

      <section className="product-accordions">
        {sections.map((section) => (
          <div className="accordion" key={section.title}>
            <button
              className="accordion-trigger"
              onClick={() => toggleSection(section.title)}
              aria-expanded={openSections.includes(section.title)}
            >
              <span>{section.title}</span>
              <span className="accordion-icon">
                {openSections.includes(section.title) ? "−" : "+"}
              </span>
            </button>

            {openSections.includes(section.title) && (
              <div className="accordion-content">
                {section.content || "Product information coming soon."}
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
