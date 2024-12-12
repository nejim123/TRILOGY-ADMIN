import { useQuery } from 'react-query';
import { getActivityLogs } from '@/utils/api';
import { formatRelativeTime } from '@/utils/format';
import LoadingSpinner from '../common/LoadingSpinner';
import Alert from '../common/Alert';

export default function ActivityLog() {
  const { data: logs, isLoading, error } = useQuery('activityLogs', getActivityLogs);

  if (isLoading) return <LoadingSpinner />;

  if (error) return <Alert type="error" message="Failed to load activity logs" />;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Recent Activity
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {logs?.map((log) => (
            <li key={log.id} className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-900">
                    {log.restaurant_name} was {log.action}
                  </p>
                  <p className="text-xs text-gray-500">
                    by {log.performed_by}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {formatRelativeTime(log.created_at)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
