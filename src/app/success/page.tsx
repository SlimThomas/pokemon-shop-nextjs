'use client';

import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-12 border-4 border-[#ffcb05]">
            <div className="text-8xl mb-6">✅</div>
            <h1 className="text-5xl font-bold text-[#3b4cca] mb-6">
              Tak for din bestilling!
            </h1>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8 border-2 border-green-200">
              <p className="text-lg text-gray-700">
                Din bestilling er modtaget og sendt til os. Vi vender tilbage på din email hurtigst muligt! 📧
              </p>
            </div>
            <div className="space-y-4">
              <Link 
                href="/"
                className="inline-block bg-gradient-to-r from-[#3b4cca] to-[#2563eb] text-white px-8 py-4 rounded-xl font-bold hover:from-[#2563eb] hover:to-[#3b4cca] transition-all shadow-lg hover:shadow-xl text-lg"
              >
                🏠 Tilbage til forsiden
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                Du modtager en bekræftelse inden for 24 timer
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}