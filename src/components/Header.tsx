import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          ⚡ PokéShop
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="hover:underline">
            Forside
          </Link>
          <Link href="/products" className="hover:underline">
            Kort
          </Link>
          <Link href="/cart" className="hover:underline">
            Kurv (0)
          </Link>
        </div>
      </nav>
    </header>
  );
}