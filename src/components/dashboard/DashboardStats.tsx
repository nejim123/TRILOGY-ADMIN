import { useQuery } from 'react-query';
import { ChartBarIcon, UserGroupIcon, KeyIcon, ExclamationIcon } from '@heroicons/react/24/outline';

export default function DashboardStats() {
  const { data: stats } = useQuery('dashboardStats', async () => {
    const res = await fetch('/api/stats');
    return res.json();
  });

  const statItems = [
    {
      name: 'Total Restaurants',
      value: stats?.totalRestaurants || 0,
      icon: UserGroupIcon,
    },
    {
      name: 'Active Users',
      value: stats?.activeUsers || 0,
      icon: ChartBarIcon,
    },
    {
      name: 'API Keys',
      value: stats?.totalApiKeys || 0,
      icon: KeyIcon,
    },
    {
      name: 'Failed Access Attempts',
      value: stats?.failedAttempts || 0,
      icon: ExclamationIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item) => (
        <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <item.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {item.name}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {item.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
