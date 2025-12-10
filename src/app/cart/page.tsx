'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const { items, removeFromCart, addToCart, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto border-4 border-[#ffcb05]">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-4xl font-bold text-[#3b4cca] mb-4">Din kurv er tom</h1>
            <p className="text-gray-600 mb-8">
              Tilføj nogle fantastiske Pokémon kort for at komme i gang!
            </p>
            <Link 
              href="/" 
              className="inline-block bg-gradient-to-r from-[#3b4cca] to-[#2563eb] text-white px-8 py-4 rounded-xl font-bold hover:from-[#2563eb] hover:to-[#3b4cca] transition-all shadow-lg hover:shadow-xl"
            >
              Se vores kort
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#3b4cca] mb-8">Din Kurv 🛒</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Kurv items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="bg-white border-2 border-[#ffcb05] rounded-xl p-4 flex gap-4 shadow-lg hover:shadow-xl transition"
              >
                {/* Billede */}
                <div className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg p-2 flex items-center justify-center w-32 flex-shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.name}
                    width={96}
                    height={128}
                    className="w-full h-auto object-contain"
                    unoptimized={true}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#3b4cca]">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.set}</p>
                    <p className="text-gray-500 text-sm">{item.condition}</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-700">{item.price} kr / stk</p>
                </div>

                {/* Quantity controls */}
                <div className="flex flex-col items-end justify-between">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-8 h-8 bg-white border-2 border-[#3b4cca] rounded text-[#3b4cca] font-bold hover:bg-[#3b4cca] hover:text-white transition"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-bold text-[#3b4cca] text-lg">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-8 h-8 bg-white border-2 border-[#3b4cca] rounded text-[#3b4cca] font-bold hover:bg-[#3b4cca] hover:text-white transition"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-bold text-xl text-[#dc2626]">
                    {item.price * item.quantity} kr
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border-4 border-[#ffcb05] rounded-2xl p-6 sticky top-4 shadow-xl">
              <h2 className="text-2xl font-bold text-[#3b4cca] mb-6">Oversigt</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Antal kort:</span>
                  <span className="font-bold">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="border-t-2 border-gray-200 pt-3">
                  <div className="flex justify-between text-2xl font-bold text-[#3b4cca]">
                    <span>Total:</span>
                    <span>{totalPrice} kr</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full block text-center bg-gradient-to-r from-[#3b4cca] to-[#2563eb] text-white px-6 py-4 rounded-xl font-bold hover:from-[#2563eb] hover:to-[#3b4cca] mb-3 transition-all shadow-lg hover:shadow-xl"
              >
                Gå til checkout →
              </Link>

              <button
                onClick={clearCart}
                className="w-full text-red-600 hover:text-red-700 font-semibold py-2 hover:bg-red-50 rounded-lg transition"
              >
                Tøm kurv
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}