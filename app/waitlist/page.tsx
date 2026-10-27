import SubscribeForm from "./subscribe-form";

export const metadata = { title: "Join the waitlist | MoreDip" };

export default function WaitlistPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1ca5d2] px-6 py-20 text-black">
      <section className="w-full max-w-[1018px]" aria-labelledby="waitlist-heading">
        <h1 id="waitlist-heading" className="mb-6 text-xl font-normal uppercase sm:text-[28px]">
          Sign up for exclusive deals &amp; releases
        </h1>
        <SubscribeForm />
      </section>
    </main>
  );
}
