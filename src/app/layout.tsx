import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PokéShop - Køb Pokémon Kort Online",
    template: "%s | PokéShop"
  },
  description: "Køb autentiske Pokémon kort fra vores personlige samling. Base Set, Holo Rare og mere. Hurtig levering og sikker betaling.",
  keywords: ["pokémon kort", "pokemon cards", "køb pokemon kort", "base set", "charizard", "trading cards"],
  authors: [{ name: "Thomas" }],
  openGraph: {
    title: "PokéShop - Køb Pokémon Kort Online",
    description: "Køb autentiske Pokémon kort fra vores personlige samling",
    type: "website",
    locale: "da_DK",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}