"use client";
import Link from "next/link";
const primaryLinks = ["Products", "Waitlist", "About Us", "Cart"]
const secondaryLinks = ["Wholesale", "Link 6", "Link 7", "Link 8"]

function Footer() {
  return (
    <footer className="bg-[#17a6de] px-6 py-12 text-black sm:px-10 lg:min-h-[611px] lg:px-[6.25%] lg:py-[108px]">
      <div className="mx-auto grid w-full max-w-[1512px] gap-14 lg:grid-cols-[minmax(420px,604px)_minmax(560px,1fr)] lg:gap-[7.85%]">
        <div>
          <h2 className="font-['Inter:Bold'] text-[32px] leading-tight font-bold lg:text-[41px] lg:leading-[1.2]">
            Looking for More?
          </h2>

          <div className="mt-9 grid grid-cols-2 gap-8 lg:mt-[59px] lg:max-w-[480px]">
            <nav aria-label="Primary footer navigation">
              <ul className="space-y-2 lg:space-y-0">
                {primaryLinks.map((label) => (
                  <li key={label}>
                    <a
                      className="font-['Inter:Regular'] text-[25px] leading-[1.45] font-normal hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
                      href="#"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Secondary footer navigation">
              <ul className="space-y-2 lg:space-y-0">
                {secondaryLinks.map((label) => (
                  <li key={label}>
                    <a
                      className="font-['Inter:Regular'] text-[25px] leading-[1.45] font-normal hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
                      href="#"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pt-[2px]">
          <form
            className="max-w-[739px]"
            onSubmit={(event) => event.preventDefault()}
          >
            <label
              className="mb-[18px] block font-['Inter:Regular'] text-[13px] leading-none font-normal uppercase"
              htmlFor="footer-email"
            >
              Sign up for exclusive deals &amp; releases
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <input
                className="h-[83px] min-w-0 flex-1 bg-[#d9d9d9] px-4 font-['Inter:Regular'] text-[24px] font-normal text-black placeholder:text-[#7d7d7d] focus-visible:outline-2 focus-visible:outline-offset-2"
                id="footer-email"
                name="email"
                placeholder="Email"
                type="email"
              />
              <button
                className="h-[83px] bg-[#ffd208] px-8 font-['Inter:Regular'] text-[18px] font-normal transition-[filter] hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-[206px]"
                type="submit"
              >
                Subscribe
              </button>
            </div>
          </form>

          <p className="mt-[38px] font-['Inter:Regular'] text-[14px] leading-none font-normal uppercase">
            Follow us on socials @eatmoredip
          </p>

          <div
            aria-label="Social media links"
            className="mt-[27px] grid max-w-[797px] grid-cols-2 gap-[11px] sm:grid-cols-4 sm:gap-[18px]"
          >
            {["Instagram", "TikTok", "Facebook", "YouTube"].map((network) => (
              <a
                aria-label={network}
                className="aspect-[179/177.259] bg-[#c2c2c2] focus-visible:outline-2 focus-visible:outline-offset-2"
                href="#"
                key={network}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return <Footer />
}