import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Point Burien | Upscale Sports Bar & Events",
  description:
    "Burien's premier 21+ upscale sports bar and events destination. Premium craft drinks, elevated dining, live sports, and private event venue — The Treehouse.",
  keywords: "sports bar, Burien, upscale, craft cocktails, private events, SeaTac",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
