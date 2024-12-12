import { ApiResponse, Restaurant, ActivityLog, DashboardStats } from '@/types';

async function fetchApi<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`/api/${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error('API request failed');
  }

  return response.json();
}

export async function getRestaurants(): Promise<Restaurant[]> {
  return fetchApi<Restaurant[]>('restaurants');
}

export async function toggleRestaurant(id: string, active: boolean): Promise<void> {
  await fetchApi(`restaurants/${id}/toggle`, {
    method: 'POST',
    body: JSON.stringify({ active }),
  });
}

export async function getActivityLogs(): Promise<ActivityLog[]> {
  return fetchApi<ActivityLog[]>('activity-logs');
}

export async function getDashboardStats(): Promise<DashboardStats> {
  return fetchApi<DashboardStats>('stats');
}
