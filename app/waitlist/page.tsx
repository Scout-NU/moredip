import SubscribeForm from "./subscribe-form";

export const metadata = { title: "Join the waitlist | MoreDip" };

export default function WaitlistPage() {
  return (
    <section className="grid grid-cols-1 bg-[#fff4de] pb-10 md:min-h-[650px] md:grid-cols-[51%_49%]" aria-labelledby="waitlist-heading">
      <div className="-mb-10 h-[360px] bg-[#d9d9d9] md:h-auto" aria-hidden="true" />
      <div className="flex items-center justify-center px-6 py-10 md:px-10 md:py-[46px]">
        <div className="relative top-4 w-full min-w-0 max-w-[504px]">
          <h1 id="waitlist-heading" className="font-league mb-[30px] text-center text-[64px] leading-[1.05] md:mb-[45px] md:text-[clamp(59px,6.3vw,86px)]">Join the Dip Club!</h1>
          <SubscribeForm />
        </div>
      </div>
    </section>
  );
}
