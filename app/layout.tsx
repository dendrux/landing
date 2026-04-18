import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dendrux — The async Python runtime for agents that survive failure",
  description:
    "Dendrux is the async Python runtime for agents that survive failure, persist everything, and bridge to the real world. Tools as plain Python functions. State that doesn't lie.",
  metadataBase: new URL("https://dendrux.dev"),
  openGraph: {
    title: "Dendrux — Agents that survive failure",
    description:
      "The async Python runtime for agents that survive failure, persist everything, and bridge to the real world.",
    url: "https://dendrux.dev",
    siteName: "Dendrux",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dendrux — Agents that survive failure",
    description:
      "The async Python runtime for agents that survive failure, persist everything, and bridge to the real world.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plex.variable} ${mono.variable} ${display.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
