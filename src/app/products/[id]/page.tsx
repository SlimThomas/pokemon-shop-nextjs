import { pokemonCards } from '@/data/cards';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import { Metadata } from 'next';
import Image from 'next/image';

// Dette genererer statiske sider for alle kort ved build time (SSG)
export async function generateStaticParams() {
  return pokemonCards.map((card) => ({
    id: card.id,
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  const card = pokemonCards.find((c) => c.id === id);

  if (!card) {
    return {
      title: "Kort ikke fundet",
    };
  }

  return {
    title: `${card.name} - ${card.set}`,
    description: `${card.description} Køb ${card.name} fra ${card.set}. ${card.condition}. ${card.inStock ? 'På lager nu' : 'Udsolgt'} - ${card.price} kr.`,
    openGraph: {
      title: `${card.name} - PokéShop`,
      description: card.description,
      images: [card.image],
    },
  };
}


// Tilføj async og await params
export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const card = pokemonCards.find((c) => c.id === id);

  if (!card) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4">
        <Link 
          href="/" 
          className="inline-flex items-center text-[#3b4cca] hover:text-[#2563eb] font-semibold mb-6 transition"
        >
          ← Tilbage til oversigt
        </Link>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-[#ffcb05]">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Billede sektion */}
            <div className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl p-8 flex items-center justify-center">
              <Image 
                src={card.image} 
                alt={card.name}
                width={400}
                height={560}
                className="w-full max-w-md h-auto rounded-lg shadow-2xl"
                unoptimized={true}
              />
            </div>

            {/* Info sektion */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold text-[#3b4cca] mb-2">{card.name}</h1>
                <p className="text-xl text-gray-600 mb-6">{card.set}</p>

                <div className="bg-gradient-to-r from-[#ffcb05] to-yellow-300 rounded-xl p-6 mb-6">
                  <p className="text-sm text-gray-700 mb-1">Pris</p>
                  <p className="text-5xl font-bold text-[#3b4cca]">{card.price} kr</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-[#3b4cca]">⭐ Sjældenhed:</span>
                    <span className="font-bold text-gray-700">{card.rarity}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-[#3b4cca]">💎 Tilstand:</span>
                    <span className="font-bold text-gray-700">{card.condition}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-[#3b4cca]">📦 Status:</span>
                    <span className={`font-bold ${card.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {card.inStock ? '✓ På lager' : '✗ Udsolgt'}
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 mb-6 border-2 border-blue-200">
                  <p className="text-sm font-semibold text-[#3b4cca] mb-2">Om kortet:</p>
                  <p className="text-gray-700">{card.description}</p>
                </div>
              </div>

              <AddToCartButton card={card} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}