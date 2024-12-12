import { useSession } from 'next-auth/react';
import Layout from '@/components/layout/Layout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import ActivityLog from '@/components/dashboard/ActivityLog';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (!session) {
    return <div>Access denied</div>;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardStats />
        <div className="mt-8">
          <ActivityLog />
        </div>
      </div>
    </Layout>
  );
}
