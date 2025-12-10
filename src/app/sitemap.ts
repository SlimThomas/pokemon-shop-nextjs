import { MetadataRoute } from 'next';
import { pokemonCards } from '@/data/cards';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pokemon-shop-nextjs.vercel.app'; // Vi ændrer denne når du deployer
  
  // Statiske sider
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: 'always' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/checkout`,
      lastModified: new Date(),
      changeFrequency: 'always' as const,
      priority: 0.5,
    },
  ];

  // Dynamiske produkt sider
  const productPages = pokemonCards.map((card) => ({
    url: `${baseUrl}/products/${card.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}