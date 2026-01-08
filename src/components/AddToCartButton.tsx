'use client';

import { useCart } from '@/context/CartContext';
import { PokemonCard } from '@/types/pokemon';
import { useState } from 'react';

export default function AddToCartButton({ card }: { card: PokemonCard }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    if (!card.inStock) return; // Extra safety check
    addToCart(card);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!card.inStock) {
    return (
      <button 
        disabled
        className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white px-8 py-4 rounded-xl font-bold text-lg cursor-not-allowed transition-all duration-300 shadow-lg opacity-60"
      >
        ✗ Udsolgt - Kan ikke købes
      </button>
    );
  }

  return (
    <button 
      onClick={handleClick}
      className="w-full bg-gradient-to-r from-[#3b4cca] to-[#2563eb] text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-[#2563eb] hover:to-[#3b4cca] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
    >
      {added ? '✓ Tilføjet til kurv!' : '🛒 Tilføj til kurv'}
    </button>
  );
}