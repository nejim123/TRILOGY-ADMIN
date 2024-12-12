import { useSession } from 'next-auth/react';
import Layout from '@/components/layout/Layout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import ActivityLog from '@/components/dashboard/ActivityLog';
import RestaurantList from '@/components/restaurants/RestaurantList';

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Access denied</div>;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardStats />
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <RestaurantList />
          <ActivityLog />
        </div>
      </div>
    </Layout>
  );
}
