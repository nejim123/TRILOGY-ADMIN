import Link from 'next/link';
import { useRouter } from 'next/router';
import { HomeIcon, UsersIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function Sidebar() {
  const router = useRouter();
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Restaurants', href: '/restaurants', icon: UsersIcon },
    { name: 'Activity', href: '/activity', icon: ChartBarIcon },
  ];

  return (
    <div className="w-64 bg-white shadow h-screen">
      <nav className="mt-5 px-2">
        {navigation.map((item) => {
          const isActive = router.pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                isActive 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`mr-4 h-6 w-6 ${
                isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-500'
              }`} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
