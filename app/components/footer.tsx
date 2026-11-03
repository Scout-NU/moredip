
"use client";

const primaryLinks = [
  "Products",
  "Waitlist",
  "About Us",
  "Cart",
];

const primaryHrefs = [
  "/#products",
  "/#waitlist",
  "/#about",
  "/#cart",
];

const secondaryLinks = [
  "Wholesale",
  "Link 6",
  "Link 7",
  "Link 8",
];

export default function Footer() {
  return (
    <footer className="w-full min-w-0 bg-[#17a6de] px-6 py-12 text-black sm:px-10 lg:min-h-[500px] lg:px-[6.25%] lg:py-[108px]">
      <div className="mx-auto grid w-full min-w-0 max-w-[1512px] grid-cols-1 gap-14 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-[155px]">

        {/* Left column */}
        <div className="min-w-0">
          <h2 className="text-[55px] font-bold leading-tight lg:text-[55px] lg:leading-[1.2]">
            Looking for More?
          </h2>

          <div className="mt-9 grid grid-cols-2 gap-x-8 sm:gap-x-16 lg:mt-[59px] lg:max-w-[560px] lg:gap-x-24">

            {/* Primary links */}
            <nav aria-label="Primary footer navigation">
              <ul className="space-y-2 lg:space-y-0">
                {primaryLinks.map((label, index) => (
                  <li key={label}>
                    <a
                      href={primaryHrefs[index]}
                      className="text-[20px] font-normal leading-[1.45] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 sm:text-[30px]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Secondary links */}
            <nav aria-label="Secondary footer navigation">
              <ul className="space-y-2 lg:space-y-0">
                {secondaryLinks.map((label) => (
                  <li key={label}>
                    <a
                      href="#"
                      className="text-[20px] font-normal leading-[1.45] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 sm:text-[30px]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Right column */}
        <div className="min-w-0 lg:pt-[2px]">

          {/* Email signup */}
          <form
            className="w-full max-w-[739px]"
            onSubmit={(event) => event.preventDefault()}
          >
            <label
              htmlFor="footer-email"
              className="mb-[18px] block text-[20px] font-normal uppercase leading-none"
            >
              Sign up for exclusive deals &amp; releases
            </label>

            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:gap-4">
              <input
                id="footer-email"
                name="email"
                type="email"
                placeholder="Email"
                className="h-[50px] w-full min-w-0 flex-1 bg-[#fff2df] px-4 text-[30px] font-normal text-black placeholder:text-[#7d7d7d] focus-visible:outline-2 focus-visible:outline-offset-2 sm:flex-1"
              />

              <button
                type="submit"
                className="h-[50px] w-fit shrink-0 self-start bg-[#ffd208] px-8 text-[30px] font-normal whitespace-nowrap transition-[filter] hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Subscribe
              </button>
            </div>
          </form>

          {/* Social heading */}
          <p className="mt-[38px] text-[20px] font-normal uppercase leading-none">
            Follow us on socials @eatmoredip
          </p>

          {/* Social links */}
          <div
            aria-label="Social media links"
            className="mt-[27px] grid w-full max-w-[797px] grid-cols-2 gap-[11px] sm:grid-cols-4 sm:gap-[18px]"
          >
            {[
              "Instagram",
              "TikTok",
              "Facebook",
              "YouTube",
            ].map((network) => (
              <a
                key={network}
                href="#"
                aria-label={network}
                className="aspect-[179/177.259] min-w-0 bg-[#FFF2DF] focus-visible:outline-2 focus-visible:outline-offset-2"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
