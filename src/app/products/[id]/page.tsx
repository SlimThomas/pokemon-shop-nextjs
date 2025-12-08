import { pokemonCards } from '@/data/cards';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Dette genererer statiske sider for alle kort ved build time (SSG)
export async function generateStaticParams() {
  return pokemonCards.map((card) => ({
    id: card.id,
  }));
}

// Tilføj async og await params
export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params; // Await params her!
  const card = pokemonCards.find((c) => c.id === id);

  if (!card) {
    notFound();
  }

  return (
    <main className="container mx-auto p-8">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Tilbage til oversigt
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mt-4">
        {/* Billede sektion */}
        <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="w-64 h-80 bg-gray-300 rounded-lg flex items-center justify-center mb-4">
              <span className="text-gray-500">Billede placeholder</span>
            </div>
            <p className="text-sm text-gray-600">{card.image}</p>
          </div>
        </div>

        {/* Info sektion */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{card.name}</h1>
          <p className="text-gray-600 mb-4">{card.set}</p>

          <div className="mb-6">
            <p className="text-3xl font-bold text-blue-600">{card.price} kr</p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex gap-2">
              <span className="font-semibold">Sjældenhed:</span>
              <span>{card.rarity}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Tilstand:</span>
              <span>{card.condition}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Status:</span>
              <span className={card.inStock ? 'text-green-600' : 'text-red-600'}>
                {card.inStock ? 'På lager' : 'Udsolgt'}
              </span>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{card.description}</p>

          <button 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!card.inStock}
          >
            {card.inStock ? 'Tilføj til kurv' : 'Udsolgt'}
          </button>
        </div>
      </div>
    </main>
  );
}