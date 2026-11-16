"use client";

import { useRef, useState, type FormEvent } from "react";

const focusClass = "focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-foreground";
const inputClass = `block h-[70px] w-full min-w-0 rounded-none border-2 border-[#f71953] bg-[#fff4de] px-[22px] text-[30px] leading-[1.35] text-[#eb1750] placeholder:text-[#eb1750] placeholder:opacity-100 ${focusClass}`;

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
        body: JSON.stringify({ email: data.get("email"), website: data.get("website") }),
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
    <form className="relative" onSubmit={subscribe} aria-busy={pending}>
      <fieldset disabled={pending} className="m-0 flex min-w-0 flex-col gap-4 border-0 p-0 disabled:opacity-65 [&:disabled_button]:cursor-wait">
        <legend className="sr-only">Join the MoreDip waitlist</legend>
        <label className="sr-only" htmlFor="waitlist-email">Email (required)</label>
        <input className={inputClass} id="waitlist-email" name="email" type="email" autoComplete="email" placeholder="Email*" required maxLength={254} aria-describedby="subscription-result" />
        <button type="submit" className={`font-league min-h-[74px] cursor-pointer rounded-none bg-foreground text-[30px] text-[#fff4de] hover:bg-[#b81742] ${focusClass}`}>{pending ? "Submitting…" : "Submit"}</button>
      </fieldset>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p id="subscription-result" role="status" aria-live="polite" aria-atomic="true" className="absolute top-full mt-3 w-full bg-[#fff4de] px-3 text-center text-base empty:hidden">
        {message}
      </p>
    </form>
  );
}
