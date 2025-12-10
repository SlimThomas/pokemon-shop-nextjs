import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://pokemon-shop-nextjs.vercel.app'; // Vi ændrer denne når du deployer
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/success/'], // Google behøver ikke disse sider
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}