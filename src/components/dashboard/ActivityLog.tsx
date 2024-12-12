import { useQuery } from 'react-query';
import { format } from 'date-fns';

export default function ActivityLog() {
  const { data: logs } = useQuery('activityLogs', async () => {
    const res = await fetch('/api/activity-logs');
    return res.json();
  });

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Activity Log
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {logs?.map((log: any) => (
            <li key={log.id} className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-900">
                    {log.action} by {log.performed_by}
                  </p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(log.created_at), 'PPpp')}
                  </p>
                </div>
                {log.ip_address && (
                  <span className="text-xs text-gray-400">
                    IP: {log.ip_address}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
