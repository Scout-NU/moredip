"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { PointerEvent } from "react";

type Review =
  | {
      type: "photo";
      image: string;
      alt: string;
    }
  | {
      type: "quote orange" | "quote pink" | "quote blue";
      quote: string;
      name: string;
    };

const reviews: Review[] = [
  {
    type: "quote orange",
    quote: "My family and I love MOREDIP! It's such a gamechanger when it comes to hosting and I couldn't recommend it more.",
    name: "Mira C.",
  },
  {
    type: "photo",
    image: "/images/grid6.png",
    alt: "Friends enjoying MoreDip",
  },
  {
    type: "quote pink",
    quote: "The only dip I'll ever get for my parties! There's absolutely nothing better that tastes so good and is great for you.",
    name: "Grace C.",
  },
  {
    type: "photo",
    image: "/images/grid3.png",
    alt: "MoreDip at a party",
  },
  {
    type: "quote blue",
    quote: "MOREDIP has completely changed my expectations for what a dip can be. I don't think I'll go back!",
    name: "MoreDip Fan",
  },
  {
  type: "photo",
  image: "/images/grid1.png",
  alt: "A selection of MoreDip samples",
  },
];

export default function Testimonials() {
  const windowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const speed = useRef(0);
  const position = useRef(0);
  const groupWidth = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      groupWidth.current = track.scrollWidth / 3;
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    let frame: number;

    const animate = () => {
      position.current += speed.current;

      if (groupWidth.current > 0) {
        position.current =
          ((position.current % groupWidth.current) +
            groupWidth.current) %
          groupWidth.current;
      }

      track.style.transform = `translate3d(${-position.current}px, 0, 0)`;

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const container = windowRef.current;
    if (!container) return;

    const bounds = container.getBoundingClientRect();

    const pointerPosition =
      (event.clientX - bounds.left) / bounds.width;

    // Center = stop; left/right = opposite directions
    const distanceFromCenter = pointerPosition - 0.5;

    // Adjust 1 to change maximum speed
    speed.current = distanceFromCenter * 1;
  };

  const handlePointerLeave = () => {
    speed.current = 0;
  };

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">
        It’s Okay To Double Dip
      </h2>

      <div
        className="testimonials-window"
        ref={windowRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="testimonials-track" ref={trackRef}>
          {[0, 1, 2].map((group) => (
            <div className="testimonials-group" key={group}>
              {reviews.map((review, index) => (
                <article
                  className={`review-card ${review.type}`}
                  key={`${group}-${index}`}
                >
                  {review.type === "photo" ? (
                    <Image
                      src={review.image}
                      alt={review.alt}
                      fill
                      sizes="(max-width: 600px) 70vw, 20vw"
                      className="review-image"
                    />
                  ) : (
                    <>
                      <p className="review-quote">
                        “{review.quote}”
                      </p>
                      <div className="review-attribution">
                        <div className="review-stars">★ ★ ★ ★ ★</div>
                        <p className="review-name">{review.name}</p>
                      </div>
                    </>
                  )}
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}