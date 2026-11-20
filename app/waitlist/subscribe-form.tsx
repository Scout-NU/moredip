"use client";

import { useRef, useState, type FormEvent } from "react";

const focusClass = "focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-foreground";
const inputClass = `block h-[72px] w-full min-w-0 rounded-none border-2 border-foreground bg-[#fff4e3] px-[28px] text-[28px] leading-[1.35] text-foreground placeholder:text-foreground md:h-[84px] md:text-[32px] placeholder:opacity-100 ${focusClass}`;

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
      <fieldset disabled={pending} className="m-0 flex min-w-0 flex-col gap-5 border-0 p-0 disabled:opacity-65 [&:disabled_button]:cursor-wait">
        <legend className="sr-only">Join the MoreDip waitlist</legend>
        <label className="sr-only" htmlFor="waitlist-email">Email (required)</label>
        <input className={inputClass} id="waitlist-email" name="email" type="email" autoComplete="email" placeholder="Email*" required maxLength={254} aria-describedby="subscription-result" />
        <button type="submit" className={`min-h-[72px] cursor-pointer rounded-none bg-foreground text-[30px] font-bold text-[#fff4e3] transition-colors hover:bg-[#b81742] md:min-h-[88px] md:text-[34px] ${focusClass}`}>{pending ? "Submitting…" : "Submit"}</button>
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
