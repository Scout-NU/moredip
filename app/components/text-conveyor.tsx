import ConveyorTrack from "./conveyor-track";

/*
  A full-width strip of repeating text that scrolls like the header bar.
  It uses the shared conveyor speed from conveyor-track.tsx.
*/
export default function TextConveyor({
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
      className="w-full min-w-0 overflow-hidden whitespace-nowrap"
      style={{ backgroundColor: background, color }}
      role="marquee"
      aria-label={text}
    >
      <ConveyorTrack className="announcement-track">
        {[0, 1].map((group) => (
          <div
            key={group}
            className="flex flex-none items-center"
            aria-hidden="true"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="inline-block shrink-0 px-4 py-3 text-[18px] font-bold uppercase tracking-[0.5px] sm:text-[22px]"
              >
                {text}
              </span>
            ))}
          </div>
        ))}
      </ConveyorTrack>
    </div>
  );
}
