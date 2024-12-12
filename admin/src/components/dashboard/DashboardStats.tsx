import { useQuery } from 'react-query';
import { ChartBarIcon, UserGroupIcon, KeyIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { getDashboardStats } from '@/utils/api';
import LoadingSpinner from '../common/LoadingSpinner';

export default function DashboardStats() {
  const { data: stats, isLoading } = useQuery('dashboardStats', getDashboardStats);

  if (isLoading) return <LoadingSpinner />;

  const statItems = [
    {
      name: 'Total Restaurants',
      value: stats?.totalRestaurants || 0,
      icon: UserGroupIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Active Users',
      value: stats?.activeUsers || 0,
      icon: ChartBarIcon,
      color: 'bg-green-500',
    },
    {
      name: 'API Keys',
      value: stats?.totalApiKeys || 0,
      icon: KeyIcon,
      color: 'bg-purple-500',
    },
    {
      name: 'Failed Access Attempts',
      value: stats?.failedAttempts || 0,
      icon: ExclamationTriangleIcon,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item) => (
        <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className={`flex-shrink-0 rounded-md p-3 ${item.color}`}>
                <item.icon className="h-6 w-6 text-white" />
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
