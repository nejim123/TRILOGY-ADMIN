import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow h-screen">
      <nav className="mt-5 px-2">
        <Link href="/" className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
          Restaurants
        </Link>
      </nav>
    </div>
  );
}
