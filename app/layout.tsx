import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frederikke Schmidt — Teknisk projektleder & produktejer",
  description:
    "Portfolio og CV. Teknisk projektleder og produktejer — fører projekter fra idé til lanceret produkt, med 7+ års frontend og daglig praksis med AI som fundament.",
  openGraph: {
    title: "Frederikke Schmidt — Teknisk projektleder & produktejer",
    description:
      "Portfolio og CV. Bygget med Claude Code, Next.js, shadcn/ui og Framer Motion.",
    type: "website",
    locale: "da_DK",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="da" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="min-h-screen">
        <div className="aurora" aria-hidden>
          <div className="aurora__orb aurora__orb--lilla-1" />
          <div className="aurora__orb aurora__orb--lime" />
          <div className="aurora__orb aurora__orb--pink" />
          <div className="aurora__orb aurora__orb--orange" />
        </div>
        {children}
      </body>
    </html>
  );
}
