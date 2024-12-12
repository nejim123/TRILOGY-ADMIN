import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Switch } from '@headlessui/react';

export default function RestaurantList() {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: restaurants } = useQuery('restaurants', async () => {
    const res = await fetch('/api/restaurants');
    return res.json();
  });

  const toggleMutation = useMutation(
    async ({ id, active }: { id: string; active: boolean }) => {
      await fetch(`/api/restaurants/${id}/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active })
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('restaurants');
      }
    }
  );

  const filteredRestaurants = restaurants?.filter(
    (restaurant: any) => 
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Restaurants
          </h3>
          <input
            type="text"
            placeholder="Search..."
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-64 sm:text-sm border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {filteredRestaurants?.map((restaurant: any) => (
            <li key={restaurant.id} className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    {restaurant.name}
                  </h4>
                  <p className="text-sm text-gray-500">{restaurant.email}</p>
                  <p className="text-xs text-gray-400">
                    API Key: {restaurant.api_key}
                  </p>
                </div>
                <Switch
                  checked={restaurant.active}
                  onChange={() => 
                    toggleMutation.mutate({
                      id: restaurant.id,
                      active: !restaurant.active
                    })
                  }
                  className={`${
                    restaurant.active ? 'bg-green-600' : 'bg-gray-200'
                  } relative inline-flex items-center h-6 rounded-full w-11`}
                >
                  <span className="sr-only">Toggle access</span>
                  <span
                    className={`${
                      restaurant.active ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 transform bg-white rounded-full`}
                  />
                </Switch>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
