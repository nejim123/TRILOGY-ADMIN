import { useQuery } from 'react-query';
import Layout from '@/components/layout/Layout';
import RestaurantList from '@/components/restaurants/RestaurantList';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Alert from '@/components/common/Alert';
import { getRestaurants } from '@/utils/api';

export default function RestaurantsPage() {
  const { data: restaurants, isLoading, error } = useQuery('restaurants', getRestaurants);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Restaurants</h1>
        
        {isLoading && <LoadingSpinner />}
        
        {error instanceof Error && (
          <Alert 
            type="error" 
            message="Failed to load restaurants" 
          />
        )}
        
        {restaurants && <RestaurantList restaurants={restaurants} />}
      </div>
    </Layout>
  );
}
