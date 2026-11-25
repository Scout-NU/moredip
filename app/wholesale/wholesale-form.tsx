"use client";

import { useState, type SubmitEvent } from "react";

const focusClass = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";
const fieldClass = `block w-full min-w-0 rounded-none border-2 border-[#f71953] bg-transparent px-5 text-[26px] leading-[1.2] text-foreground placeholder:text-[#eb1750] placeholder:opacity-100 sm:px-6 sm:text-[28px] ${focusClass}`;
const inputClass = `${fieldClass} h-[66px]`;

export default function WholesaleForm() {
  const [message, setMessage] = useState("");

  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Online inquiries are not available yet. Please email hello@eatmoredip.com to get in touch.");
  }

  return (
    <form onSubmit={submit} aria-label="Wholesale inquiry" className="min-w-0">
      <fieldset className="m-0 flex min-w-0 flex-col gap-3 border-0 p-0">
        <legend className="sr-only">Wholesale inquiry details</legend>
        <label htmlFor="wholesale-company" className="sr-only">Company name (required)</label>
        <input id="wholesale-company" name="companyName" autoComplete="organization" placeholder="Company name*" required maxLength={150} className={inputClass} />

        <label htmlFor="wholesale-name" className="sr-only">Full name (required)</label>
        <input id="wholesale-name" name="fullName" autoComplete="name" placeholder="Full name*" required maxLength={100} className={inputClass} />

        <label htmlFor="wholesale-email" className="sr-only">Your email (required)</label>
        <input id="wholesale-email" name="email" type="email" autoComplete="email" placeholder="Your Email*" required maxLength={254} className={inputClass} />

        <label htmlFor="wholesale-url" className="sr-only">Instagram or website URL</label>
        <input id="wholesale-url" name="url" type="text" inputMode="url" autoComplete="url" placeholder="URL (Instagram or website)" maxLength={500} className={inputClass} />

        <label htmlFor="wholesale-message" className="sr-only">Tell us about yourself</label>
        <textarea id="wholesale-message" name="message" placeholder="Tell us about yourself!" rows={5} maxLength={3000} className={`${fieldClass} min-h-[186px] resize-y py-5`} />

        <button type="submit" aria-describedby="wholesale-result" className={`font-league min-h-11 w-full cursor-pointer bg-foreground px-5 py-1 text-[28px] leading-none text-[#fff4de] hover:bg-[#b81742] ${focusClass}`}>
          Submit
        </button>
      </fieldset>
      <p id="wholesale-result" role="status" aria-live="polite" className="mt-3 text-lg leading-snug empty:hidden">{message}</p>
    </form>
  );
}
