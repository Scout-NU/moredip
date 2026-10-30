
import type { ReactNode } from "react";

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
    image: "/images/mexican-corn.png",
  },
  {
    name: "Spinach Artichoke",
    shortName: "SPINACH ARTICHOKE",
    background: "#80b51b",
    border: "#24551d",
    textColor: "#d62050",
    image: "/images/spinach-artichoke.png",
  },
  {
    name: "Hummus",
    shortName: "HUMMUS",
    background: "#e8a332",
    border: "#d62050",
    textColor: "#d62050",
    image: "/images/hummus.png",
  },
];

/* ========================================
   SOCIAL GALLERY DATA
======================================== */

const gallery = [
  { label: "Event", image: "/images/social-1.jpg" },
  { label: "MoreDip", image: "/images/social-2.jpg" },
  { label: "Behind the Scenes", image: "/images/social-3.jpg" },
  { label: "Community", image: "/images/social-4.jpg" },
  { label: "MoreDip Fans", image: "/images/social-5.jpg" },
  { label: "Friends", image: "/images/social-6.jpg" },
  { label: "New Kids on the Block", image: "/images/social-7.jpg" },
  { label: "MoreDip Lifestyle", image: "/images/social-8.jpg" },
];

/* ========================================
   PRODUCT CARD
======================================== */

function ProductCard({
  product,
}: {
  product: (typeof products)[number];
}) {
  return (
    <div className="flex shrink-0 flex-col items-center">
      <div
        className="relative flex aspect-square w-[220px] flex-col items-center justify-center overflow-hidden rounded-full border-[7px] shadow-md sm:w-[270px] lg:w-[310px]"
        style={{
          backgroundColor: product.background,
          borderColor: product.border,
          backgroundImage: `url("${product.image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        role="img"
        aria-label={product.name}
      >
        <div className="flex flex-col items-center px-3 text-center">
          <span
            className="text-[12px] font-bold"
            style={{ color: product.textColor }}
          >
            7G PROTEIN
          </span>

          <span
            className="text-[49px] font-black leading-none tracking-[-2px] sm:text-[60px]"
            style={{ color: product.textColor }}
          >
            MOREdip
          </span>

          <span className="mt-3 bg-[#ffdc00] px-2 py-1 text-[12px] font-bold text-[#d62050]">
            {product.shortName}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ========================================
   SCROLLING TEXT BANNER
======================================== */

function ConveyorBanner({
  text,
  background,
  color,
}: {
  text: string;
  background: string;
  color: string;
}) {
  return (
    <div
      className="home-announcement-bar"
      style={{
        backgroundColor: background,
        color,
      }}
    >
      <div className="announcement-track">
        {[0, 1].map((group) => (
          <div
            key={group}
            className="announcement-group"
            aria-hidden={group === 1}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i}>{text}</span>
            ))}
          </div>
        ))}
      </div>
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
      <div className="home-products-track">
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
      </div>
    </div>
  );
}

/* ========================================
   INGREDIENT ARROW
======================================== */

/*
  Arrows are drawn using exact SVG endpoints.

  Each arrow starts near a text block and ends
  close to the central circle.

  Using a shared coordinate system keeps
  the arrows aligned with the descriptions.
*/

type ArrowLine = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

function IngredientArrows() {
  const arrows: ArrowLine[] = [
    // Top left
    { x1: 205, y1: 105, x2: 385, y2: 220 },

    // Middle left
    { x1: 310, y1: 405, x2: 425, y2: 405 },


    // Bottom left
    { x1: 340, y1: 680, x2: 470, y2: 605 },

    // Top right
    { x1: 1250, y1: 235, x2: 1080, y2: 300 },

    // Bottom right
    { x1: 1250, y1: 640, x2: 1090, y2: 550 },
  ];

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-20 hidden h-full w-full lg:block"
      viewBox="0 0 1500 760"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <marker
          id="ingredient-arrowhead"
          markerWidth="9"
          markerHeight="9"
          refX="7"
          refY="4.5"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path
            d="M 0 0 L 8 4.5 L 0 9"
            fill="none"
            stroke="#111111"
            strokeWidth="1.5"
          />
        </marker>
      </defs>

      {arrows.map((arrow, index) => (
        <line
          key={index}
          x1={arrow.x1}
          y1={arrow.y1}
          x2={arrow.x2}
          y2={arrow.y2}
          stroke="#111111"
          strokeWidth="1.8"
          strokeLinecap="round"
          markerEnd="url(#ingredient-arrowhead)"
        />
      ))}
    </svg>
  );
}

/* ========================================
   INGREDIENT DESCRIPTION
======================================== */

function IngredientDescription({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`absolute z-30 max-w-[310px] text-[22px] font-bold leading-[1.1] text-[#d62050] xl:text-[30px] ${className}`}
    >
      {children}
    </div>
  );
}

/* ========================================
   INGREDIENTS SECTION
======================================== */

function IngredientsSection() {
  const descriptions = [
    "Ingredients call out or other information",
    "Ingredients call out or other information",
    "Ingredients call out or other information",
    "Ingredients call out or other information",
    "Ingredients call out or other information",
  ];

  return (
    <section
      id="about"
      className="w-full overflow-hidden bg-[#ffd208] px-4 py-16 lg:py-24"
    >
      {/* Desktop layout */}

      <div className="relative mx-auto hidden h-[760px] w-full max-w-[1500px] lg:block">

        {/* Central circle */}
        <div
          className="absolute left-1/2 top-1/2 z-10 flex aspect-square w-[43%] max-w-[650px] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-[#d9d9d9] bg-cover bg-center p-8 text-center text-black"
          style={{
            backgroundImage: "url('/images/dip-closeup.jpg')",
          }}
        >
          <p className="max-w-[400px] text-[28px] leading-tight xl:text-[34px]">
            Close up image of the dip
            <br />
            see pulkypickledip.com
            <br />
            for reference
          </p>
        </div>

        {/* Descriptions */}

        <IngredientDescription className="left-[5%] top-[2%]">
          Ingredients call out
          <br />
          or other information
        </IngredientDescription>

        <IngredientDescription className="left-[4%] top-[46%]">
          Ingredients call out
          <br />
          or other information
        </IngredientDescription>

        <IngredientDescription className="bottom-[1%] left-[16%]">
          Ingredients call out
          <br />
          or other information
        </IngredientDescription>

        <IngredientDescription className="right-[3%] top-[17%]">
          Ingredients call out
          <br />
          or other information
        </IngredientDescription>

        <IngredientDescription className="bottom-[2%] right-[3%]">
          Ingredients call out
          <br />
          or other information
        </IngredientDescription>

        {/* Arrows rendered separately */}
        <IngredientArrows />
      </div>

      {/* Mobile and tablet layout */}

      <div className="flex flex-col items-center gap-10 lg:hidden">

        {/* Circle */}
        <div
          className="flex aspect-square w-[min(85vw,480px)] items-center justify-center overflow-hidden rounded-full bg-[#d9d9d9] bg-cover bg-center p-6 text-center text-black"
          style={{
            backgroundImage: "url('/images/dip-closeup.jpg')",
          }}
        >
          <p className="max-w-[260px] text-[18px] leading-tight sm:text-[26px]">
            Close up image of the dip
            <br />
            see pulkypickledip.com
            <br />
            for reference
          </p>
        </div>

        {/* Descriptions */}
        <div className="grid w-full max-w-[700px] grid-cols-1 gap-6 sm:grid-cols-2">
          {descriptions.map((description, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 text-center"
            >
              <p className="max-w-[270px] text-[22px] font-bold leading-tight text-[#d62050] sm:text-[26px]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
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
        className="grid min-h-[480px] w-full grid-cols-1 bg-[#d9d9d9] md:min-h-[550px] md:grid-cols-2"
      >
        <div
          className="flex min-h-[280px] items-center justify-center bg-cover bg-center text-black md:min-h-[550px]"
          style={{
            backgroundImage: "url('/images/hero.jpg')",
          }}
        >
          <span className="text-2xl">
            Hero Image
          </span>
        </div>

        <div className="flex flex-col items-start justify-center px-8 py-12 sm:px-12 lg:px-16">
          <h1 className="max-w-[550px] text-[40px] font-bold leading-[1.05] text-[#d62050] sm:text-[54px] lg:text-[70px]">
            Text over Hero Image:
            <br />
            Specific Content TBD
          </h1>

          <a
            href="#products"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#00a8df] px-8 py-4 text-[22px] font-bold uppercase text-[#ffda00] transition-all duration-200 hover:scale-105 hover:brightness-95"
          >
            YES PLEASE
          </a>
        </div>
      </section>

      {/* SECTION 2: PRODUCTS */}

      <section
        id="products"
        className="w-full overflow-hidden bg-[#17a6de]"
      >
        <ConveyorBanner
          text="CONVEYER TEXT TBD."
          background="#FFD208"
          color="#17A6DE"
        />

        <ProductConveyor />

        <ConveyorBanner
          text="Conveyor Text - Conveyor Text -"
          background="#D62050"
          color="#FFD208"
        />
      </section>

      {/* SECTION 3: INGREDIENTS */}

      <IngredientsSection />

      {/* SECTION 4: SOCIAL GALLERY */}

      <section
        id="social"
        className="w-full bg-[#fff2db] px-5 py-16 sm:px-10 lg:py-24"
      >
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center">

          <h2 className="bg-[#ffd208] px-5 py-2 text-center text-[28px] font-bold leading-tight text-[#d62050] sm:text-[38px]">
            Title Text or One Liner Text
          </h2>

          <a
            href="https://www.instagram.com/eatmoredip/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 text-[26px] font-bold text-[#a2003c] hover:underline"
          >
            @eatmoredip
          </a>

          <div className="mt-12 grid w-full grid-cols-2 gap-2 border-[8px] border-[#980039] bg-[#980039] sm:grid-cols-4 sm:gap-3 sm:border-[12px]">
            {gallery.map((item) => (
              <div
                key={item.label}
                className="relative aspect-square overflow-hidden bg-[#dedede] bg-cover bg-center"
                style={{
                  backgroundImage: `url("${item.image}")`,
                }}
                role="img"
                aria-label={item.label}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 p-3 text-center text-base font-bold text-black">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
