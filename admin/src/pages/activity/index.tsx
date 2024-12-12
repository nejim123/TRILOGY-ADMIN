import Layout from '@/components/layout/Layout';
import ActivityLog from '@/components/dashboard/ActivityLog';

export default function ActivityPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Activity Log</h1>
        <ActivityLog />
      </div>
    </Layout>
  );
}
