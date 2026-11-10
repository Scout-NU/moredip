"use client";

import { useRef, useState, type FormEvent } from "react";

const focusClass = "focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-foreground";
const fieldClass = `block w-full min-w-0 border-2 border-[#f71953] bg-transparent px-[18px] py-[10px] text-2xl leading-[1.35] placeholder:text-[#eb1750] placeholder:opacity-100 ${focusClass}`;
const inputClass = `${fieldClass} h-[58px] rounded-full`;

export default function SubscribeForm() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const submitting = useRef(false);

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    submitting.current = true;
    setPending(true);
    setMessage("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), fullName: data.get("fullName"), product: data.get("product"), referral: data.get("referral"), website: data.get("website") }),
        signal: AbortSignal.timeout(15000),
      });
      const body = await response.json();
      setMessage(body.message);
      if (response.ok) form.reset();
    } catch {
      setMessage("We couldn't confirm your subscription. Please try again.");
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return (
    <form onSubmit={subscribe} aria-busy={pending}>
      <fieldset disabled={pending} className="m-0 flex min-w-0 flex-col gap-[10px] border-0 p-0 disabled:opacity-65 [&:disabled_button]:cursor-wait">
        <legend className="sr-only">Join the MoreDip waitlist</legend>
        <label className="sr-only" htmlFor="waitlist-name">Full name (required)</label>
        <input className={inputClass} id="waitlist-name" name="fullName" autoComplete="name" placeholder="Full Name*" required maxLength={100} />
        <label className="sr-only" htmlFor="waitlist-email">Email (required)</label>
        <input className={inputClass} id="waitlist-email" name="email" type="email" autoComplete="email" placeholder="Email*" required maxLength={254} aria-describedby="subscription-result" />
        <div className="relative">
          <label className="sr-only" htmlFor="waitlist-product">Product</label>
          <select className={`${inputClass} appearance-none pr-12`} id="waitlist-product" name="product" defaultValue="">
            <option value="">Product</option>
            <option>Mexican Street Style Corn</option>
            <option>Spinach Artichoke</option>
            <option>Hummus</option>
          </select>
          <svg className="pointer-events-none absolute top-1/2 right-5 size-[26px] -translate-y-1/2" aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="m4 8 8 8 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <label className="sr-only" htmlFor="waitlist-referral">How did you hear about us?</label>
        <textarea className={`${fieldClass} h-[162px] resize-y rounded-[40px]`} id="waitlist-referral" name="referral" placeholder="How did you hear about us?" maxLength={500} rows={4} />
        <button type="submit" className={`min-h-10 cursor-pointer rounded-[24px] bg-foreground text-2xl font-bold text-[#fff4de] hover:bg-[#b81742] ${focusClass}`}>{pending ? "Submitting…" : "Submit"}</button>
      </fieldset>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p id="subscription-result" role="status" aria-live="polite" aria-atomic="true" className="mt-3 min-h-6 text-base">
        {message}
      </p>
    </form>
  );
}
