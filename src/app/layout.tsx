import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "BijliWala — Trusted Electricians | Fixed Price | 90-Day Warranty",
  description: "Book background-verified electricians. Fixed prices. 90-day warranty. Available in 50+ Tier-2 & Tier-3 cities across India.",
  keywords: "electrician, electrical services, home services, Tier-2, Tier-3, India, fixed price, verified",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "BijliWala" },
};

export const viewport: Viewport = {
  themeColor: "#f97316",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="min-h-full bg-white text-slate-900 antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
