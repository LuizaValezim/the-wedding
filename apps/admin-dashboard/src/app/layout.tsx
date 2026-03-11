import type { Metadata } from "next";
import { Dosis } from "next/font/google";

import "./styles/globals.css";

const dosis = Dosis({ subsets: ["latin"], variable: "--font-sans" });

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
      <body className={`${dosis.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
