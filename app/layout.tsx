
import type { Metadata } from "next";
import { Geist, Geist_Mono, Barlow_Condensed } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import Footer from "./components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "MoreDip",
  description: "MoreDip",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen w-full min-w-0 flex-col overflow-x-clip">
        <header className="site-header">
          {/* Left navigation */}
          <nav className="nav-left" aria-label="Left navigation">
            <Link href="/#products">Products</Link>
            <Link href="/#waitlist">Join the Waitlist</Link>
          </nav>

          {/* Center logo */}
          <Link href="/" className="site-logo">
            <Image
              src="/images/MOREDIPLogoColors-07.png"
              alt="MoreDip"
              width={180}
              height={70}
              priority
              className="logo-image"
            />
          </Link>

          {/* Right navigation */}
          <nav className="nav-right" aria-label="Right navigation">
            <Link href="/#about">About</Link>
            <Link href="/#cart">Cart</Link>
          </nav>

          {/* Announcement bar */}
          <div className="announcement-bar">
            <div className="announcement-track">
              {[0, 1].map((group) => (
                <div
                  className="announcement-group"
                  key={group}
                  aria-hidden={group === 1}
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i}>
                      7G OF PROTEIN PER SERVING.
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </header>

        <main className="w-full min-w-0 flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
