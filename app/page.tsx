
import Image from "next/image";
import Link from "next/link";
import ConveyorTrack from "./components/conveyor-track";
import DipCloseupCarousel from "./components/dip-closeup-carousel";
import { gallery } from "./data/gallery";

/* ========================================
   PRODUCT DATA
======================================== */

const products = [
  {
    name: "Mexican Street Style Corn",
    shortName: "MEXICAN STREET STYLE CORN",
    background: "#f04423",
    border: "#125b91",
    textColor: "#ffdc00",
    image: "/images/tub-mexican-corn.png",
    closeupImage: "/images/tub-mexican-corn.png",
  },
  {
    name: "Spinach Artichoke",
    shortName: "SPINACH ARTICHOKE",
    background: "#80b51b",
    border: "#24551d",
    textColor: "#d62050",
    image: "/images/tub-spinach-artichoke.png",
    closeupImage: "/images/tub-spinach-artichoke.png",
  },
  {
    name: "Hummus",
    shortName: "HUMMUS",
    background: "#ffd208",
    border: "#d62050",
    textColor: "#d62050",
    image: "/images/tub-hummus.png",
    closeupImage: "/images/tub-hummus.png",
  },
];

/* Social gallery photos live in app/data/gallery.ts */

/* ========================================
   PRODUCT CARD
======================================== */

function ProductCard({
  product,
}: {
  product: (typeof products)[number];
}) {
  return (
    <div className="relative aspect-square w-[220px] shrink-0 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.25)] sm:w-[270px] lg:w-[310px]">
      <Image
        src={product.image}
        alt={`MoreDip ${product.name} tub`}
        fill
        sizes="(min-width: 1024px) 310px, (min-width: 640px) 270px, 220px"
        className="rounded-full object-cover"
      />
    </div>
  );
}

/* ========================================
   INFINITE DIP CONVEYOR
======================================== */

function ProductConveyor() {
  return (
    <div
      className="home-products-viewport"
      aria-label="MoreDip products"
    >
      <ConveyorTrack className="home-products-track">
        {[0, 1].map((group) => (
          <div
            key={group}
            className="home-products-group"
            aria-hidden={group === 1}
          >
            {Array.from({ length: 4 }).flatMap((_, repeat) =>
              products.map((product) => (
                <ProductCard
                  key={`${repeat}-${product.name}`}
                  product={product}
                />
              ))
            )}
          </div>
        ))}
      </ConveyorTrack>
    </div>
  );
}

/* ========================================
   HOMEPAGE
======================================== */

export default function Home() {
  return (
    <div className="w-full min-w-0 overflow-x-clip">

      {/* SECTION 1: HERO */}

      <section
        id="home"
        className="flex min-h-[460px] w-full items-center justify-center bg-[#d9d9d9] bg-cover bg-center md:aspect-[1728/936] md:min-h-0"
        style={{
          backgroundImage: "url('/images/homehero.png')",
        }}
      >
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
          <h1 className="font-league text-[clamp(52px,6.6vw,124px)] font-normal uppercase leading-[1.08] text-[#fff6e6] [text-shadow:0_2px_14px_rgba(0,0,0,0.3)]">
            Some things are worth
            <br />
            double-dipping for.
          </h1>

          <Link
            href="/products"
            className="mt-[clamp(24px,3.2vw,60px)] inline-flex items-center justify-center bg-[#17a6de] px-[clamp(36px,4.8vw,88px)] py-[clamp(8px,1vw,18px)] text-[clamp(30px,3.6vw,66px)] font-bold uppercase leading-[1.2] text-[#ffda00] transition-all duration-200 hover:scale-105 hover:brightness-95 hover:shadow-[0_0_22px_6px_rgba(255,218,0,0.6)]"
          >
            Yes please
          </Link>
        </div>
      </section>

      {/* SECTION 2: PRODUCTS */}

      <section
        id="products"
        className="w-full overflow-hidden bg-[#17a6de]"
      >
        <ProductConveyor />
      </section>

      {/* SECTION 3: DIP CLOSEUP CAROUSEL */}

      <DipCloseupCarousel dips={products} />

      {/* SECTION 4: SOCIAL GALLERY */}

      <section
        id="social"
        className="w-full bg-[#fff2db] px-5 py-12 sm:px-10 lg:py-16"
      >
        <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center">

          <h2 className="bg-[#ffd208] px-6 py-2 text-center text-[28px] font-bold uppercase leading-tight tracking-[0.5px] text-[#d62050] sm:px-8 sm:py-3 sm:text-[44px]">
            Good times are better with MoreDip
          </h2>

          <div className="mt-10 grid w-full grid-cols-2 gap-3 border-[12px] border-[#8b1538] bg-[#8b1538] sm:mt-16 sm:grid-cols-4 sm:gap-6 sm:border-[20px]">
            {gallery.map((item) => (
              <a
                key={item.image}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.alt} (opens Instagram post)`}
                className="group relative aspect-square overflow-hidden bg-[#dedede] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#ffd208]"
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 260px, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{ objectPosition: item.focus }}
                />
              </a>
            ))}
          </div>

          <a
            href="https://www.instagram.com/eatmoredip/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 self-end text-[24px] font-bold text-[#8b1538] hover:underline sm:text-[32px]"
          >
            @eatmoredip
          </a>
        </div>
      </section>
    </div>
  );
}
