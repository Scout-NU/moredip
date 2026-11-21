import SubscribeForm from "./subscribe-form";

export const metadata = { title: "Join the waitlist | MoreDip" };

export default function WaitlistPage() {
  return (
    <section
      className="relative flex min-h-[560px] w-full items-center justify-center overflow-hidden bg-[#d9d9d9] bg-cover px-6 py-16 md:min-h-[clamp(600px,52vw,820px)]"
      style={{
        backgroundImage: "url('/images/waitlisthero.png')",
        /* Keeps the three tubs in frame and crops the photo's bottom edge */
        backgroundPosition: "center 30%",
      }}
      aria-labelledby="waitlist-heading"
    >
      {/* Light wash so the heading and form stand out from the photo */}
      <div className="absolute inset-0 bg-white/25" aria-hidden="true" />

      <div className="relative w-full min-w-0 max-w-[630px]">
        <h1
          id="waitlist-heading"
          className="font-league mb-8 text-center text-[64px] leading-[1.05] text-foreground md:mb-14 md:text-[clamp(72px,7vw,108px)]"
        >
          Join the Dip Club
        </h1>

        <SubscribeForm />
      </div>
    </section>
  );
}
