
import Image from "next/image";
import ConveyorTrack from "./components/conveyor-track";
import DipCloseupCarousel from "./components/dip-closeup-carousel";

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

/* ========================================
   SOCIAL GALLERY DATA
======================================== */

/*
  Photos are cropped to squares in the grid.
  "focus" is the CSS object-position that keeps the
  important part of each photo in frame.
*/
const gallery = [
  {
    image: "/images/grid1.png",
    alt: "MoreDip tasting table with dip samples at a waterfront event",
    focus: "center 75%",
  },
  {
    image: "/images/grid2.png",
    alt: "Hand holding a MoreDip Hummus tub on a tennis court",
    focus: "center 25%",
  },
  {
    image: "/images/grid3.png",
    alt: "Three MoreDip flavors on a tailgate table next to a grill",
    focus: "center 80%",
  },
  {
    image: "/images/grid6.png",
    alt: "Three friends in denim jackets holding MoreDip tubs outdoors",
    focus: "center 40%",
  },
  {
    image: "/images/grid4.png",
    alt: "Two friends smiling and holding MoreDip tubs",
    focus: "center 30%",
  },
  {
    image: "/images/grid8.png",
    alt: "Two friends raising MoreDip tubs at an outdoor event",
    focus: "center 65%",
  },
  {
    image: "/images/grid5.png",
    alt: "New Kids on the Block pantry event poster",
    focus: "center 15%",
  },
  {
    image: "/images/grid7.png",
    alt: "MoreDip Hummus tub on a bar next to cocktails",
    focus: "center 65%",
  },
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
      <ConveyorTrack className="announcement-track">
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
      </ConveyorTrack>
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
        className="grid min-h-[540px] w-full grid-cols-1 bg-[#d9d9d9] md:min-h-[640px] md:grid-cols-2"
      >
        <div
          className="flex min-h-[320px] items-center justify-center bg-cover bg-center text-black md:min-h-[640px]"
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
          text="CONVEYOR TEXT TBD."
          background="#FFD208"
          color="#17A6DE"
        />

        <ProductConveyor />

        <ConveyorBanner
          text="CONVEYOR TEXT TBD."
          background="#D62050"
          color="#FFD208"
        />
      </section>

      {/* SECTION 3: DIP CLOSEUP CAROUSEL */}

      <DipCloseupCarousel dips={products} />

      {/* SECTION 4: SOCIAL GALLERY */}

      <section
        id="social"
        className="w-full bg-[#fff2db] px-5 py-12 sm:px-10 lg:py-16"
      >
        <div className="mx-auto flex w-full max-w-[1050px] flex-col items-center">

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

          <div className="mt-8 grid w-full grid-cols-2 gap-2 border-[8px] border-[#980039] bg-[#980039] sm:grid-cols-4 sm:gap-3 sm:border-[12px]">
            {gallery.map((item) => (
              <div
                key={item.image}
                className="relative aspect-square overflow-hidden bg-[#dedede]"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 640px) 300px, 50vw"
                  className="object-cover"
                  style={{ objectPosition: item.focus }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
