'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="bg-[#ffcb05] border-b-4 border-[#3b4cca]">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image 
            src="/poketrade-logo.png" 
            alt="PokéTrade"
            width={200}
            height={60}
            className="h-12 w-auto"
          />
        </Link>
        <div className="flex gap-6 items-center">
          <Link 
            href="/" 
            className="text-[#3b4cca] font-bold hover:text-[#2563eb] transition"
          >
            Forside
          </Link>
          <Link 
            href="/cart" 
            className="bg-[#3b4cca] text-white px-4 py-2 rounded-full font-bold hover:bg-[#2563eb] transition flex items-center gap-2"
          >
            🛒 Kurv ({totalItems})
          </Link>
        </div>
      </nav>
    </header>
  );
}