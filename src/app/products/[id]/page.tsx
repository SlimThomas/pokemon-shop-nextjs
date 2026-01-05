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

  // Structured Data (JSON-LD) for SEO - Google Rich Results
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": card.name,
    "description": card.description,
    "image": card.image,
    "brand": {
      "@type": "Brand",
      "name": "Pokémon"
    },
    "offers": {
      "@type": "Offer",
      "price": card.price,
      "priceCurrency": "DKK",
      "availability": card.inStock 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/UsedCondition",
      "url": `https://pokemon-shop-nextjs.vercel.app/products/${card.id}`,
      "seller": {
        "@type": "Organization",
        "name": "PokéTrade"
      }
    },
    "category": "Trading Cards",
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Set",
        "value": card.set
      },
      {
        "@type": "PropertyValue",
        "name": "Rarity",
        "value": card.rarity
      },
      {
        "@type": "PropertyValue",
        "name": "Condition",
        "value": card.condition
      }
    ]
  };

  // BreadcrumbList Schema for navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Hjem",
        "item": "https://pokemon-shop-nextjs.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": card.name,
        "item": `https://pokemon-shop-nextjs.vercel.app/products/${card.id}`
      }
    ]
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
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
                alt={`${card.name} pokémon kort fra ${card.set} - ${card.rarity} i ${card.condition} tilstand`}
                width={400}
                height={560}
                className="w-full max-w-md h-auto rounded-lg shadow-2xl"
                priority
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
    </>
  );
}