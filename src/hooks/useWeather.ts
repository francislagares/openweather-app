import { useQuery } from '@tanstack/react-query';

import { WeatherData } from '@/types/weather';

import { apiClient } from '@/services/api';

const useWeather = (place: string) => {
  return useQuery<WeatherData>({
    queryKey: ['weatherData', place],
    queryFn: async () => apiClient.get<WeatherData>(`/forecast?q=${place}`),

    enabled: !!place,
  });
};

export default useWeather;
