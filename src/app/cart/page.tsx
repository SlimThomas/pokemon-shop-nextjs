'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeFromCart, addToCart, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="container mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Din kurv er tom</h1>
        <p className="text-gray-600 mb-8">Tilføj nogle Pokémon kort for at komme i gang!</p>
        <Link 
          href="/" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Se vores kort
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Din kurv</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Kurv items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="border rounded-lg p-4 flex gap-4"
            >
              {/* Billede */}
              <img 
                src={item.image} 
                alt={item.name}
                className="w-24 h-32 object-contain"
              />

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.set}</p>
                <p className="text-gray-500 text-sm">{item.condition}</p>
                <p className="text-lg font-semibold mt-2">{item.price} kr</p>
              </div>

              {/* Quantity controls */}
              <div className="flex flex-col items-end justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-8 h-8 border rounded hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-8 h-8 border rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <p className="font-bold text-lg">
                  {item.price * item.quantity} kr
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary sidebar */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-4">
            <h2 className="text-2xl font-bold mb-4">Oversigt</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Antal kort:</span>
                <span className="font-semibold">
                  {items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-2 border-t">
                <span>Total:</span>
                <span>{totalPrice} kr</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full block text-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 mb-2"
            >
              Gå til checkout
            </Link>

            <button
              onClick={clearCart}
              className="w-full text-red-600 hover:text-red-700 text-sm"
            >
              Tøm kurv
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}