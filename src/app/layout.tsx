import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Manrope,
  IBM_Plex_Mono,
  Great_Vibes,
} from "next/font/google";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Pinky Varghese — Implantology & Smile Design, Kochi",
  description:
    "A private practice dedicated to implantology and smile design — elegant, unhurried care in Kochi, Kerala.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} ${ibmPlexMono.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans antialiased selection:bg-[#c9a96e] selection:text-[#1a0f2e]">
        {children}
      </body>
    </html>
  );
}
