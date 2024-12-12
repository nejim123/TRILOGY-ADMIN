export interface Restaurant {
  id: string;
  name: string;
  email: string;
  api_key: string;
  active: boolean;
  last_active: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  restaurant_id: string;
  restaurant_name: string;
  action: string;
  performed_by: string;
  created_at: string;
}

export interface DashboardStats {
  totalRestaurants: number;
  activeUsers: number;
  totalApiKeys: number;
  failedAttempts: number;
}

export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}
