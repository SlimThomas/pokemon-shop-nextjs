'use client';

import { useCart } from '@/context/CartContext';
import { PokemonCard } from '@/types/pokemon';
import { useState } from 'react';

export default function AddToCartButton({ card }: { card: PokemonCard }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(card);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button 
      onClick={handleClick}
      className="w-full bg-gradient-to-r from-[#3b4cca] to-[#2563eb] text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-[#2563eb] hover:to-[#3b4cca] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
      disabled={!card.inStock}
    >
      {!card.inStock ? '✗ Udsolgt' : added ? '✓ Tilføjet til kurv!' : '🛒 Tilføj til kurv'}
    </button>
  );
}