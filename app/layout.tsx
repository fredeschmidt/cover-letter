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
  title: "Frederikke Schmidt — AI frontend-udvikler",
  description:
    "Portfolio og CV. Jeg bygger produkter med AI som medskaber — frontend-håndværk, agent-workflows og ejerskab fra idé til færdig løsning.",
  openGraph: {
    title: "Frederikke Schmidt — AI frontend-udvikler",
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
    <html lang="da" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen">
        <div className="aurora" aria-hidden>
          <div className="aurora__orb aurora__orb--violet-1" />
          <div className="aurora__orb aurora__orb--lime" />
          <div className="aurora__orb aurora__orb--violet-2" />
          <div className="aurora__orb aurora__orb--amber" />
        </div>
        {children}
      </body>
    </html>
  );
}
