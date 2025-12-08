import { PokemonCard } from '@/types/pokemon';

export const pokemonCards: PokemonCard[] = [
  {
    id: '1',
    name: 'Charizard',
    price: 500,
    image: '/images/charizard.jpg', // Vi laver placeholder billeder senere
    description: 'En kraftfuld ild Pokémon. Meget populært kort fra Base Set.',
    set: 'Base Set',
    rarity: 'Holo Rare',
    condition: 'Near Mint',
    inStock: true,
  },
  {
    id: '2',
    name: 'Pikachu',
    price: 150,
    image: '/images/pikachu.jpg',
    description: 'Det ikoniske elektriske Pokémon. Altid et hit!',
    set: 'Base Set',
    rarity: 'Common',
    condition: 'Near Mint',
    inStock: true,
  },
  {
    id: '3',
    name: 'Blastoise',
    price: 350,
    image: '/images/blastoise.jpg',
    description: 'Kraftfuld vand Pokémon med stærke vandangreb.',
    set: 'Base Set',
    rarity: 'Holo Rare',
    condition: 'Lightly Played',
    inStock: true,
  },
  {
    id: '4',
    name: 'Venusaur',
    price: 300,
    image: '/images/venusaur.jpg',
    description: 'Plante type starter Pokémon i sin endelige evolution.',
    set: 'Base Set',
    rarity: 'Holo Rare',
    condition: 'Near Mint',
    inStock: false, // Eksempel på udsolgt kort
  },
];