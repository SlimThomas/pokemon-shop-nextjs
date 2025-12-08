import { pokemonCards } from '@/data/cards';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Pokémon Kort Shop</h1>
      <p className="text-gray-600 mb-8">Velkommen til min samling</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {pokemonCards.map((card) => (
    <Link 
      key={card.id} 
      href={`/products/${card.id}`}
      className="border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
    >
      <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center">
        <img 
          src={card.image} 
          alt={card.name}
          className="w-full h-full object-contain p-4"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold">{card.name}</h2>
        <p className="text-gray-600">{card.set}</p>
        <p className="text-lg font-semibold mt-2">{card.price} kr</p>
        <p className="text-sm text-gray-500">{card.condition}</p>
        {!card.inStock && (
          <p className="text-red-500 text-sm mt-2">Udsolgt</p>
        )}
      </div>
    </Link>
  ))}
</div>
    </main>
  );
}