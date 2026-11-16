import SubscribeForm from "./subscribe-form";

export const metadata = { title: "Join the waitlist | MoreDip" };

export default function WaitlistPage() {
  return (
    <section className="relative isolate flex min-h-[540px] items-center justify-center overflow-hidden bg-[#d9d9d9] px-6 py-20 md:min-h-[640px]" aria-labelledby="waitlist-heading">
      <div className="w-full max-w-[504px]">
        <h1 id="waitlist-heading" className="font-league mb-10 text-center text-[64px] leading-[1.05] text-[#d62050] md:mb-[50px] md:text-[86px]">Join the Dip Club</h1>
        <SubscribeForm />
      </div>
    </section>
  );
}
