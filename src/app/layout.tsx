import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import { AppProviders } from "@/components/AppProviders/AppProviders";
import "@/styles/globals.css";

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lexendDeca.className}`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
