import { pokemonCards } from '@/data/cards';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Forside - Se alle Pokémon kort",
  description: "Gennemse vores samling af sjældne Pokémon kort. Base Set, Jungle, og mere. Charizard, Blastoise, Pikachu og andre populære kort.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#3b4cca] to-[#2563eb] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Velkommen til PokéTrade! ⚡
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            Find sjældne og autentiske Pokémon kort fra vores personlige samling. 
            Base Set, Holo Rare og meget mere!
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-[#3b4cca] mb-8 text-center">
          Vores Kort Samling
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pokemonCards.map((card) => (
            <Link 
              key={card.id} 
              href={`/products/${card.id}`}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-[#ffcb05]"
            >
              <div className="aspect-[3/4] bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
                <Image 
                  src={card.image} 
                  alt={`${card.name} - ${card.set} ${card.rarity} pokémon kort i ${card.condition} tilstand`}
                  width={300}
                  height={420}
                  className="w-full h-full object-contain drop-shadow-xl"
                  loading="lazy"
                />
              </div>
              <div className="p-4 bg-gradient-to-b from-white to-gray-50">
                <h3 className="text-xl font-bold text-[#3b4cca] mb-1">
                  {card.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{card.set}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#dc2626]">
                    {card.price} kr
                  </span>
                  {card.inStock ? (
                    <span className="text-green-600 text-sm font-semibold">
                      ✓ På lager
                    </span>
                  ) : (
                    <span className="text-red-500 text-sm font-semibold">
                      ✗ Udsolgt
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">{card.condition}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}