import type { Metadata } from "next";
import { Roboto_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Robin | Finn fagfolk",
  description: "Finn anbefalte håndverkere i ditt nabolag",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body className={`${robotoMono.variable} ${newsreader.variable}`}>
        {children}
      </body>
    </html>
  );
}
