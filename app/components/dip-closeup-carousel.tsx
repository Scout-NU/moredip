"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

/* ========================================
   TYPES
======================================== */

export type CloseupDip = {
  name: string;
  /* Section background, matches the dip's circle in the product conveyor */
  background: string;
  /* Circle border, matches the dip's circle in the product conveyor */
  border: string;
  /* Callout text color */
  textColor: string;
  closeupImage: string;
};

/* ========================================
   DESKTOP CANVAS GEOMETRY
======================================== */

/*
  The desktop layout is drawn on a fixed 1300 x 600 canvas that scales
  as one unit. The circle, callout text and arrows all use these same
  coordinates, so the arrows stay lined up at every screen size.

  Each callout is placed by its angle around the circle. Every arrow
  has the same length and stops the same distance from the circle.
*/

const CANVAS_WIDTH = 1300;
const CANVAS_HEIGHT = 600;

const CIRCLE_X = CANVAS_WIDTH / 2;
const CIRCLE_Y = CANVAS_HEIGHT / 2;
const CIRCLE_RADIUS = 260;

/* Space between the arrow tip and the circle edge */
const ARROW_GAP = 18;

/* Length of every arrow */
const ARROW_LENGTH = 90;

/* Space between the arrow tail and its callout text */
const TEXT_GAP = 12;

/* Callout text sizing, in canvas units */
const TEXT_SIZE = 36;
const TEXT_MAX_WIDTH = 260;

/*
  Room left for the sticky header, section padding and carousel
  controls when fitting the canvas to the screen height.
*/
const RESERVED_SCREEN_HEIGHT = "300px";

/* Angles in degrees: 0 is right, 90 is down, 180 is left */
const calloutAngles = [215, 180, 145, -25, 25];

const callouts = calloutAngles.map((angle) => {
  const radians = (angle * Math.PI) / 180;
  const dx = Math.cos(radians);
  const dy = Math.sin(radians);

  const tipDistance = CIRCLE_RADIUS + ARROW_GAP;
  const tailDistance = tipDistance + ARROW_LENGTH;

  return {
    isLeft: dx < 0,
    tail: {
      x: CIRCLE_X + dx * tailDistance,
      y: CIRCLE_Y + dy * tailDistance,
    },
    tip: {
      x: CIRCLE_X + dx * tipDistance,
      y: CIRCLE_Y + dy * tipDistance,
    },
  };
});

/* Converts canvas units to a share of the canvas width */
const cqw = (units: number) => `${(units / CANVAS_WIDTH) * 100}cqw`;
const percentX = (x: number) => `${(x / CANVAS_WIDTH) * 100}%`;
const percentY = (y: number) => `${(y / CANVAS_HEIGHT) * 100}%`;

/* ========================================
   CALLOUT ARROWS
======================================== */

function CalloutArrows() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
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

      {callouts.map((callout, index) => (
        <line
          key={index}
          x1={callout.tail.x}
          y1={callout.tail.y}
          x2={callout.tip.x}
          y2={callout.tip.y}
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
   CALLOUT TEXT
======================================== */

function CalloutText({
  callout,
  color,
  text,
}: {
  callout: (typeof callouts)[number];
  color: string;
  text: string;
}) {
  const anchorX = callout.isLeft
    ? callout.tail.x - TEXT_GAP
    : callout.tail.x + TEXT_GAP;

  return (
    <p
      className="absolute z-30 font-bold leading-[1.1] transition-colors duration-500"
      style={{
        left: percentX(anchorX),
        top: percentY(callout.tail.y),
        transform: callout.isLeft
          ? "translate(-100%, -50%)"
          : "translate(0, -50%)",
        textAlign: callout.isLeft ? "right" : "left",
        width: cqw(TEXT_MAX_WIDTH),
        fontSize: cqw(TEXT_SIZE),
        color,
      }}
    >
      {text}
    </p>
  );
}

/* ========================================
   CLOSEUP CIRCLE
======================================== */

function CloseupCircle({
  dip,
  className,
  style,
  sizes,
}: {
  dip: CloseupDip;
  className: string;
  style?: CSSProperties;
  sizes: string;
}) {
  return (
    <div
      className={`aspect-square overflow-hidden rounded-full shadow-[0_14px_30px_rgba(0,0,0,0.3)] ${className}`}
      style={style}
    >
      <Image
        key={dip.closeupImage}
        src={dip.closeupImage}
        alt={`Close up of MoreDip ${dip.name}`}
        fill
        sizes={sizes}
        className="rounded-full motion-safe:animate-[closeup-fade_500ms_ease-out] object-cover"
      />
    </div>
  );
}

/* ========================================
   CAROUSEL CONTROLS
======================================== */

function ArrowButton({
  direction,
  onClick,
  color,
}: {
  direction: "previous" | "next";
  onClick: () => void;
  color: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "previous" ? "Previous dip" : "Next dip"}
      className="flex shrink-0 cursor-pointer items-center justify-center p-1 transition-transform duration-200 hover:scale-125 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      style={{ color }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-10 w-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {direction === "previous" ? (
          <path d="M15 4 L7 12 L15 20" />
        ) : (
          <path d="M9 4 L17 12 L9 20" />
        )}
      </svg>
    </button>
  );
}

function CarouselControls({
  dips,
  index,
  onPrevious,
  onNext,
  onSelect,
}: {
  dips: CloseupDip[];
  index: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}) {
  const dip = dips[index];

  return (
    <div className="flex items-center justify-center gap-6">
      <ArrowButton
        direction="previous"
        onClick={onPrevious}
        color={dip.border}
      />

      <div className="flex flex-col items-center gap-2">
        <p
          className="min-w-[200px] text-center text-[20px] font-bold uppercase leading-tight sm:text-[24px]"
          style={{ color: dip.textColor }}
          aria-live="polite"
        >
          {dip.name}
        </p>

        <div className="flex gap-2">
          {dips.map((d, i) => (
            <button
              key={d.name}
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`Show ${d.name}`}
              aria-current={i === index}
              className="h-3 w-3 cursor-pointer rounded-full border-2 transition-colors"
              style={{
                borderColor: dip.border,
                backgroundColor: i === index ? dip.border : "transparent",
              }}
            />
          ))}
        </div>
      </div>

      <ArrowButton direction="next" onClick={onNext} color={dip.border} />
    </div>
  );
}

/* ========================================
   DIP CLOSEUP CAROUSEL
======================================== */

/* Order: upper left, middle left, lower left, upper right, lower right */
const descriptions = [
  "Packed with protein",
  "Perfect for parties",
  "A go-to snack",
  "Boston based",
  "Women owned",
];

export default function DipCloseupCarousel({
  dips,
}: {
  dips: CloseupDip[];
}) {
  const [index, setIndex] = useState(0);
  const dip = dips[index];

  const previous = () => setIndex((i) => (i - 1 + dips.length) % dips.length);
  const next = () => setIndex((i) => (i + 1) % dips.length);

  const controls = (
    <CarouselControls
      dips={dips}
      index={index}
      onPrevious={previous}
      onNext={next}
      onSelect={setIndex}
    />
  );

  return (
    <section
      id="about"
      className="w-full overflow-hidden px-4 py-16 transition-colors duration-500 lg:py-10"
      style={{ backgroundColor: dip.background }}
      aria-roledescription="carousel"
      aria-label="Dip close ups"
    >
      {/* Desktop layout */}

      <div className="hidden lg:block">
        {/*
          Fixed-ratio canvas. Its width is limited by the page width,
          a 1300px maximum, and the screen height, so the whole section
          fits on screen.
        */}
        <div
          className="relative mx-auto"
          style={{
            width: `min(100%, ${CANVAS_WIDTH}px, calc((100vh - ${RESERVED_SCREEN_HEIGHT}) * ${CANVAS_WIDTH} / ${CANVAS_HEIGHT}))`,
            aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}`,
            containerType: "inline-size",
          }}
        >
          {/* Central circle */}
          <CloseupCircle
            dip={dip}
            className="absolute z-10"
            style={{
              left: percentX(CIRCLE_X - CIRCLE_RADIUS),
              top: percentY(CIRCLE_Y - CIRCLE_RADIUS),
              width: percentX(CIRCLE_RADIUS * 2),
            }}
            sizes="520px"
          />

          {/* Callouts */}
          {callouts.map((callout, i) => (
            <CalloutText
              key={i}
              callout={callout}
              color={dip.textColor}
              text={descriptions[i]}
            />
          ))}

          <CalloutArrows />
        </div>

        <div className="mt-4">{controls}</div>
      </div>

      {/* Mobile and tablet layout */}

      <div className="flex flex-col items-center gap-10 lg:hidden">
        {/* Circle */}
        <CloseupCircle
          dip={dip}
          className="relative w-[min(85vw,480px)]"
          sizes="(min-width: 640px) 480px, 85vw"
        />

        {controls}

        {/* Descriptions */}
        <div className="grid w-full max-w-[700px] grid-cols-1 gap-6 sm:grid-cols-2">
          {descriptions.map((description, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 text-center"
            >
              <p
                className="max-w-[300px] text-[28px] font-bold leading-tight transition-colors duration-500 sm:text-[34px]"
                style={{ color: dip.textColor }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
