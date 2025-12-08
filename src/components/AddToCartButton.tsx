'use client';

import { useCart } from '@/context/CartContext';
import { PokemonCard } from '@/types/pokemon';

export default function AddToCartButton({ card }: { card: PokemonCard }) {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={() => addToCart(card)}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      disabled={!card.inStock}
    >
      {card.inStock ? 'Tilføj til kurv' : 'Udsolgt'}
    </button>
  );
}