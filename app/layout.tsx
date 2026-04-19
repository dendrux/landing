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
  metadataBase: new URL("https://www.dendrux.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dendrux — Agents that survive failure",
    description:
      "The async Python runtime for agents that survive failure, persist everything, and bridge to the real world.",
    url: "https://www.dendrux.dev",
    siteName: "Dendrux",
    type: "website",
    locale: "en_US",
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

// Structured data — SoftwareSourceCode schema for the Python package
// (Google uses this for rich results on dev-tool queries) plus Organization
// so branded searches show a consistent entity card.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.dendrux.dev/#org",
      name: "Dendrux",
      url: "https://www.dendrux.dev",
      sameAs: [
        "https://github.com/dendrux/dendrux",
        "https://pypi.org/project/dendrux/",
      ],
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": "https://www.dendrux.dev/#package",
      name: "dendrux",
      description:
        "The async Python runtime for agents that survive failure, persist everything, and bridge to the real world.",
      codeRepository: "https://github.com/dendrux/dendrux",
      programmingLanguage: "Python",
      license: "https://www.apache.org/licenses/LICENSE-2.0",
      url: "https://www.dendrux.dev",
      author: { "@id": "https://www.dendrux.dev/#org" },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.dendrux.dev/#website",
      url: "https://www.dendrux.dev",
      name: "Dendrux",
      publisher: { "@id": "https://www.dendrux.dev/#org" },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plex.variable} ${mono.variable} ${display.variable} ${serif.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {children}
      </body>
    </html>
  );
}
