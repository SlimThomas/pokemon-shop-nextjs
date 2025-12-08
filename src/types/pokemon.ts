export interface PokemonCard {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  set: string; // Hvilket sæt kortet er fra (f.eks. "Base Set", "Jungle")
  rarity: string; // Common, Uncommon, Rare, Holo Rare, etc.
  condition: string; // Near Mint, Lightly Played, Moderately Played, etc.
  inStock: boolean;
}