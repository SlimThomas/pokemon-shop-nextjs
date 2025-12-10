'use client';

import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Bestilling modtaget",
  description: "Tak for din bestilling! Vi vender tilbage hurtigst muligt.",
};

export default function SuccessPage() {
  return (
    <main className="container mx-auto p-8 text-center">
      <div className="max-w-md mx-auto">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-4xl font-bold mb-4">Tak for din bestilling!</h1>
        <p className="text-gray-600 mb-8">
            Din bestilling er sendt! Jeg vender tilbage hurtigst muligt på din email.
        </p>
        <Link 
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Tilbage til forsiden
        </Link>
      </div>
    </main>
  );
}