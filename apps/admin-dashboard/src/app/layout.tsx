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
  title: "Admin Dashboard - The Wedding",
  description: "The Wedding - Admin planning dashboard for the couple",
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
