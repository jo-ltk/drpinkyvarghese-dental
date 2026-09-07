import type { Metadata } from "next";
import { Fraunces, Bodoni_Moda, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";

import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Pinky Varghese — Private Dental Atelier, Kochi",
  description:
    "An unhurried private dental practice dedicated to microscopic biomimetic preservation and architectural calm in Kochi, Kerala.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${bodoniModa.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans antialiased selection:bg-[#b6905a] selection:text-[#081411]">
        {children}
      </body>
    </html>
  );
}
