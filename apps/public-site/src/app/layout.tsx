import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";

import "./styles/globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "The Wedding",
  description: "The Wedding - Our wedding website and honeymoon fund",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfairDisplay.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
