"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
  Shared speed for every conveyor on the site, in pixels per second.
  Change this one number to speed up or slow down all conveyors.
*/
export const CONVEYOR_SPEED_PX_PER_SECOND = 40;

/*
  Each track holds two identical copies of its content and animates
  by 50% of its own width per loop. Wider content would therefore move
  faster at the same duration, so the duration is computed from the
  measured width to keep every conveyor at the same visible speed.
*/
export default function ConveyorTrack({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = ref.current;
    if (!track) return;

    const update = () => {
      const loopDistance = track.scrollWidth / 2;
      if (loopDistance > 0) {
        track.style.animationDuration = `${
          loopDistance / CONVEYOR_SPEED_PX_PER_SECOND
        }s`;
      }
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
