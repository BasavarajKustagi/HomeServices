import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BijliWala — Trusted Electricians | Fixed Price | 90-Day Warranty",
  description:
    "Book background-verified electricians in your city. Fixed prices before booking. 90-day warranty on all work. Available in 50+ Tier-2 & Tier-3 cities across India.",
  keywords:
    "electrician, electrical services, home services, Tier-2, Tier-3, India, fixed price, verified",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-white text-slate-900 antialiased">{children}</body>
    </html>
  );
}
