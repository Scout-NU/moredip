import type { Metadata } from "next";
import WholesaleForm from "./wholesale-form";

export const metadata: Metadata = {
  title: "Wholesale | MoreDip",
  description: "Bring MoreDip to your shelves. Get in touch about wholesale pricing and opportunities.",
};

export default function WholesalePage() {
  return (
    <section
      aria-labelledby="wholesale-heading"
      className="bg-[#fff4de] px-6 py-12 text-foreground sm:px-10 md:min-h-[716px] md:px-[7%] md:pt-[56px] md:pb-[86px]"
    >
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 md:grid-cols-[minmax(0,0.88fr)_minmax(0,1fr)] md:gap-[5%]">
        <div className="min-w-0 md:pt-[44px]">
          <p className="mb-3 text-[26px] leading-[1.2] sm:text-[30px]">GET IN TOUCH</p>
          <h1 id="wholesale-heading" className="font-league text-[60px] leading-[1.08] uppercase sm:text-[72px] md:text-[clamp(60px,6.5vw,96px)]">
            <span className="block">Your shelf could</span>
            <span className="block">use a little</span>
            <span className="block">more...dip</span>
          </h1>
          <p className="mt-4 max-w-[480px] text-[24px] leading-[1.2] sm:text-[28px]">
            Fill out the form, and we’ll send pricing within a couple of business days.
          </p>
          <div className="mt-8 md:mt-[62px]">
            <p className="text-[26px] leading-[1.2] sm:text-[30px]">is emailing easier?</p>
            <a
              href="mailto:hello@eatmoredip.com"
              className="mt-1 inline-block max-w-full text-[28px] leading-[1.2] font-bold break-words underline decoration-1 underline-offset-4 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 sm:text-[36px]"
            >
              hello@eatmoredip.com
            </a>
          </div>
        </div>
        <WholesaleForm />
      </div>
    </section>
  );
}
