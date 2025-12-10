'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Checkout",
  description: "Gennemfør din bestilling af Pokémon kort",
};

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  if (items.length === 0) {
    return (
      <main className="container mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Din kurv er tom</h1>
        <p className="text-gray-600 mb-8">Tilføj kort før du kan bestille!</p>
        <button 
          onClick={() => router.push('/')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Se vores kort
        </button>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/send-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        items: items,
        totalPrice: totalPrice,
      }),
    });

    if (response.ok) {
      clearCart();
      router.push('/success');
    } else {
      alert('Der skete en fejl. Prøv igen.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Der skete en fejl. Prøv igen.');
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Formular */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Kontaktinformation</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Navn *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Dit fulde navn"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="din@email.dk"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Telefon
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="+45 12 34 56 78"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Besked (valgfri)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Evt. spørgsmål eller ønsker..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Send bestilling
            </button>
          </form>
        </div>

        {/* Order summary */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Din ordre</h2>
          
          <div className="border rounded-lg p-4 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.set}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity}x {item.price} kr
                  </p>
                </div>
                <p className="font-semibold">
                  {item.quantity * item.price} kr
                </p>
              </div>
            ))}

            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span>{totalPrice} kr</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              💡 <strong>Næste skridt:</strong> Din email-klient åbner med en forhåndsudfyldt besked. Send den, så vender jeg tilbage hurtigst muligt!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}