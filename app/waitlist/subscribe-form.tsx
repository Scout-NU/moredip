"use client";

import { useRef, useState, type FormEvent } from "react";

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
    <form onSubmit={subscribe} aria-busy={pending}>
      <div className="flex flex-col gap-5 sm:flex-row">
        <label className="sr-only" htmlFor="waitlist-email">Email address</label>
        <input id="waitlist-email" name="email" type="email" autoComplete="email"
          placeholder="Email" required maxLength={254} readOnly={pending}
          aria-describedby="subscription-result"
          className="min-w-0 flex-1 rounded-none bg-[#d9d9d9] px-5 py-6 text-3xl text-black placeholder:text-[#7d7d7d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:text-[44px]" />
        <button type="submit" disabled={pending}
          className="cursor-pointer bg-[#ffd900] px-10 py-6 text-3xl text-black hover:bg-[#ffe333] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black disabled:cursor-wait disabled:opacity-70 sm:text-[38px]">
          {pending ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
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
