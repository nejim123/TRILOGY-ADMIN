import { signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Trilogy Admin</h1>
        {session && (
          <button
            onClick={() => signOut()}
            className="text-sm text-gray-700 hover:text-gray-900"
          >
            Sign out
          </button>
        )}
      </div>
    </header>
  );
}
