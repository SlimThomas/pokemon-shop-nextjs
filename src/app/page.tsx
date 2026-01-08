'use client';

import { pokemonCards } from '@/data/cards';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSet, setSelectedSet] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);

  // Get unique sets and rarities for filters
  const uniqueSets = useMemo(() => {
    const sets = new Set(pokemonCards.map(card => card.set));
    return Array.from(sets);
  }, []);

  const uniqueRarities = useMemo(() => {
    const rarities = new Set(pokemonCards.map(card => card.rarity));
    return Array.from(rarities);
  }, []);

  // Filter cards based on search and filters
  const filteredCards = useMemo(() => {
    return pokemonCards.filter(card => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.set.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.rarity.toLowerCase().includes(searchQuery.toLowerCase());

      // Set filter
      const matchesSet = selectedSet === 'all' || card.set === selectedSet;

      // Rarity filter
      const matchesRarity = selectedRarity === 'all' || card.rarity === selectedRarity;

      // Stock filter
      const matchesStock = !showOnlyInStock || card.inStock;

      return matchesSearch && matchesSet && matchesRarity && matchesStock;
    });
  }, [searchQuery, selectedSet, selectedRarity, showOnlyInStock]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSet('all');
    setSelectedRarity('all');
    setShowOnlyInStock(false);
  };

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

      {/* Search and Filter Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#ffcb05]">
          {/* Search Bar */}
          <div className="mb-6">
            <label htmlFor="search" className="block text-sm font-semibold text-[#3b4cca] mb-2">
              🔍 Søg efter kort
            </label>
            <input
              id="search"
              type="text"
              placeholder="Søg på navn, set eller sjældenhed..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#3b4cca] focus:outline-none transition-colors text-gray-900 placeholder:text-gray-500"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Set Filter */}
            <div>
              <label htmlFor="set-filter" className="block text-sm font-semibold text-[#3b4cca] mb-2">
                📦 Set
              </label>
              <select
                id="set-filter"
                value={selectedSet}
                onChange={(e) => setSelectedSet(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#3b4cca] focus:outline-none transition-colors text-gray-900"
              >
                <option value="all">Alle Sets</option>
                {uniqueSets.map(set => (
                  <option key={set} value={set}>{set}</option>
                ))}
              </select>
            </div>

            {/* Rarity Filter */}
            <div>
              <label htmlFor="rarity-filter" className="block text-sm font-semibold text-[#3b4cca] mb-2">
                ⭐ Sjældenhed
              </label>
              <select
                id="rarity-filter"
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#3b4cca] focus:outline-none transition-colors text-gray-900"
              >
                <option value="all">Alle Sjældenheder</option>
                {uniqueRarities.map(rarity => (
                  <option key={rarity} value={rarity}>{rarity}</option>
                ))}
              </select>
            </div>

            {/* Stock Filter */}
            <div>
              <label htmlFor="stock-filter" className="block text-sm font-semibold text-[#3b4cca] mb-2">
                ✓ Tilgængelighed
              </label>
              <div className="flex items-center h-[52px] px-4 border-2 border-gray-300 rounded-lg">
                <input
                  id="stock-filter"
                  type="checkbox"
                  checked={showOnlyInStock}
                  onChange={(e) => setShowOnlyInStock(e.target.checked)}
                  className="w-5 h-5 text-[#3b4cca] border-gray-300 rounded focus:ring-[#3b4cca]"
                />
                <label htmlFor="stock-filter" className="ml-3 text-gray-700 font-medium cursor-pointer">
                  Vis kun på lager
                </label>
              </div>
            </div>
          </div>

          {/* Results Count and Reset */}
          <div className="flex justify-between items-center pt-4 border-t-2 border-gray-100">
            <p className="text-gray-600 font-medium">
              Viser <span className="text-[#3b4cca] font-bold">{filteredCards.length}</span> af {pokemonCards.length} kort
            </p>
            {(searchQuery || selectedSet !== 'all' || selectedRarity !== 'all' || showOnlyInStock) && (
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
              >
                ✕ Nulstil filtre
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 pb-12">
        {filteredCards.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-[#3b4cca] mb-2">
              Ingen kort fundet
            </h3>
            <p className="text-gray-600 mb-6">
              Prøv at ændre dine søgekriterier eller filtre
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-[#3b4cca] hover:bg-[#2563eb] text-white font-bold rounded-lg transition-colors"
            >
              Nulstil alle filtre
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCards.map((card) => (
              <Link 
                key={card.id} 
                href={`/products/${card.id}`}
                className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-[#ffcb05] ${!card.inStock ? 'opacity-75' : ''}`}
              >
                <div className="relative aspect-[3/4] bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
                  <Image 
                    src={card.image} 
                    alt={`${card.name} - ${card.set} ${card.rarity} pokémon kort i ${card.condition} tilstand`}
                    width={300}
                    height={420}
                    className={`w-full h-full object-contain drop-shadow-xl ${!card.inStock ? 'grayscale' : ''}`}
                    loading="lazy"
                  />
                  {!card.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                      <span className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-lg transform -rotate-12 shadow-2xl">
                        UDSOLGT
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4 bg-gradient-to-b from-white to-gray-50">
                  <h3 className="text-xl font-bold text-[#3b4cca] mb-1">
                    {card.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{card.set}</p>
                  <div className="flex justify-between items-center">
                    <span className={`text-2xl font-bold ${!card.inStock ? 'text-gray-400' : 'text-[#dc2626]'}`}>
                      {card.price} kr
                    </span>
                    {card.inStock ? (
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                        ✓ PÅ LAGER
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
                        ✗ UDSOLGT
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{card.condition}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}