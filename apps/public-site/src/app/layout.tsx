import type { Metadata } from "next";
import { Dosis } from "next/font/google";

import "./styles/globals.css";

const dosis = Dosis({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Wedding Website",
  description: "Our wedding website and honeymoon fund",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dosis.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
