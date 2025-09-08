import type { Metadata } from "next";
import { VT323, Press_Start_2P } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  variable: "--font-pixel-body",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  variable: "--font-pixel-title",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crypto Sentiment Analysis - 8-Bit Style",
  description: "AI-powered cryptocurrency sentiment analysis with retro 8-bit gaming aesthetics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${vt323.variable} ${pressStart2P.variable} font-pixel-body bg-background text-foreground `}
      >
        {children}
      </body>
    </html>
  );
}
