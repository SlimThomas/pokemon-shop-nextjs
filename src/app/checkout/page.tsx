'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto border-4 border-[#ffcb05]">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-4xl font-bold text-[#3b4cca] mb-4">Din kurv er tom</h1>
            <p className="text-gray-600 mb-8">Tilføj kort før du kan bestille!</p>
            <button 
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-[#3b4cca] to-[#2563eb] text-white px-8 py-4 rounded-xl font-bold hover:from-[#2563eb] hover:to-[#3b4cca] transition-all shadow-lg"
            >
              Se vores kort
            </button>
          </div>
        </div>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
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

      const result = await response.json();

      if (response.ok) {
        if (result.demo) {
          alert('✅ Demo mode: Bestilling registreret (men ingen email sendt)');
        }
        
        clearCart();
        router.push('/success');
      } else {
        alert('Der skete en fejl. Prøv igen.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Der skete en fejl. Prøv igen.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#3b4cca] mb-8">Checkout 💳</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formular */}
          <div className="bg-white border-4 border-[#ffcb05] rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-[#3b4cca] mb-6">Kontaktinformation</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[#3b4cca] mb-2">
                  Navn *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3b4cca] focus:border-transparent transition placeholder:text-gray-600 text-gray-900"
                  placeholder="Dit fulde navn"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#3b4cca] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3b4cca] focus:border-transparent transition placeholder:text-gray-600 text-gray-900"
                  placeholder="din@email.dk"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#3b4cca] mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3b4cca] focus:border-transparent transition placeholder:text-gray-600 text-gray-900"
                  placeholder="+45 12 34 56 78"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#3b4cca] mb-2">
                  Besked (valgfri)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3b4cca] focus:border-transparent transition placeholder:text-gray-600 text-gray-900"
                  placeholder="Evt. spørgsmål eller ønsker..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#3b4cca] to-[#2563eb] text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-[#2563eb] hover:to-[#3b4cca] disabled:from-gray-400 disabled:to-gray-500 transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                {isSubmitting ? '⏳ Sender...' : '📧 Send bestilling'}
              </button>
            </form>
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-white border-4 border-[#ffcb05] rounded-2xl p-8 shadow-xl sticky top-4">
              <h2 className="text-2xl font-bold text-[#3b4cca] mb-6">Din ordre</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start pb-3 border-b border-gray-200">
                    <div className="flex-1">
                      <p className="font-bold text-[#3b4cca]">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.set}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity}x {item.price} kr
                      </p>
                    </div>
                    <p className="font-bold text-gray-900">
                      {item.quantity * item.price} kr
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-[#ffcb05] to-yellow-300 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-[#3b4cca]">Total:</span>
                  <span className="text-3xl font-bold text-[#3b4cca]">{totalPrice} kr</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                <p className="text-sm text-gray-700">
                  💡 <strong>Næste skridt:</strong> Vi sender dig en bekræftelse på email, og vender tilbage hurtigst muligt!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}