import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";

// next/font self-hosts the font — no external request at page load, no render block
const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-host-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Point Burien | Upscale Sports Bar & Events",
  description:
    "Burien's premier 21+ upscale sports bar and events destination. Premium craft drinks, elevated dining, live sports, and private event venue — The Treehouse.",
  keywords: "sports bar, Burien, upscale, craft cocktails, private events, SeaTac",
  icons: {
    icon: [
      { url: "/icon-light.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon-dark.png", media: "(prefers-color-scheme: light)" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Google Sans Flex is only available via Google Fonts CDN — load async with display=swap */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={hostGrotesk.variable}>{children}</body>
    </html>
  );
}
