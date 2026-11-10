import Image from "next/image";
import Link from "next/link";
import Testimonials from "../components/testimonials";

const products = [
  {
    name: "Spinach Artichoke",
    price: "$11.99",
    image: "/images/spinachartichoke.png",
    description: "Blurb about product",
  },
  {
    name: "Garlic-Roasted Hummus",
    price: "$11.99",
    image: "/images/hummus.png",
    description: "Blurb about product",
  },
  {
    name: "Mexican Street Corn",
    price: "$11.99",
    image: "/images/mexicanstreetcorn.png",
    description: "Blurb about product",
  },
];

export default function Home() {
  return (
    <main className="home-page">
      {/* Hero */}
      <section className="hero" id="about">
        <Image
          src="/images/peopleanddip.png"
          alt="Friends enjoying MoreDip"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-overlay">
          <h1>
            Shop Here Hook
            <br />
            (Text over image)
          </h1>
        </div>
      </section>

      {/* Products */}
      <section className="products-section" id="products">
        <div className="product-grid">
          {products.map((product) => (
            <Link
              href="#products"
              className="product-card"
              key={product.name}
            >
              <div className="product-image-wrap">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 700px) 90vw, 30vw"
                  className="product-image"
                />
              </div>

              <h2>{product.name}</h2>
              <p className="product-price">{product.price}</p>
              <p className="product-description">
                {product.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />
    </main>
  );
}