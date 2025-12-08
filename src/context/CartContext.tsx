'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { PokemonCard } from '@/types/pokemon';

interface CartItem extends PokemonCard {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (card: PokemonCard) => void;
  removeFromCart: (cardId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (card: PokemonCard) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === card.id);
      
      if (existingItem) {
        // Øg quantity hvis kortet allerede er i kurven
        return currentItems.map((item) =>
          item.id === card.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // Tilføj nyt kort til kurven
      return [...currentItems, { ...card, quantity: 1 }];
    });
  };

  const removeFromCart = (cardId: string) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === cardId);
      
      if (existingItem && existingItem.quantity > 1) {
        // Reducer quantity hvis mere end 1
        return currentItems.map((item) =>
          item.id === cardId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      
      // Fjern helt fra kurv hvis quantity er 1
      return currentItems.filter((item) => item.id !== cardId);
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}