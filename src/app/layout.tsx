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



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}


export const metadata: Metadata = {
  title: "AI Clarity & Strategy Calls for SaaS Founders | SaaSWayz",
  description:
    "Validate your SaaS idea before spending thousands. SaaSWayz helps non-technical founders plan, refine, and validate their product through AI-guided clarity and strategy calls.",
  keywords: [
    "SaaS clarity call",
    "AI product planning",
    "SaaS strategy call",
    "validate SaaS idea",
    "AI SaaS consultant",
    "non-technical founders",
    "AI for SaaS founders",
    "SaaS product validation",
    "AI PRD generator",
    "SaaSWayz",
  ],
  openGraph: {
    title: "AI Clarity & Strategy Calls for SaaS Founders | SaaSWayz",
    description:
      "Turn your SaaS idea into a validated plan. SaaSWayz guides you through AI-led clarity and strategy calls to define what to build, why, and how.",
    url: "https://saaswayz.com",
    siteName: "SaaSWayz",
    images: [
      {
        url: "/images/og/saaswayz-og.webp",
        width: 1200,
        height: 630,
        alt: "AI Clarity and Strategy Calls for SaaS Founders - SaaSWayz",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mhaqnegahdar",
    creator: "@mhaqnegahdar",
    title: "AI Clarity & Strategy Calls for SaaS Founders | SaaSWayz",
    description:
      "Talk to an AI strategist before you code. SaaSWayz helps you validate your SaaS idea, design your PRD, and plan your technical roadmap — all through guided AI calls.",
    images: ["/images/og/saaswayz-og.webp"],
  },
  metadataBase: new URL("https://saaswayz.com"),
  other: {
    "theme-color": "#FF8A3D",
  },
};
