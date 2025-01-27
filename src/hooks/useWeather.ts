import { useQuery } from '@tanstack/react-query';

import config from '@/config/env';

import { WeatherData } from '@/types/weather';

import { apiClient } from '@/services/api';

const useWeather = (place: string) => {
  return useQuery<WeatherData>({
    queryKey: ['weatherData', place],
    queryFn: async () => {
      return apiClient.get<WeatherData>(
        `${config.env.baseUrl}forecast?q=${place}&appid=${config.env.apiKey}&cnt=56`,
      );
    },
    enabled: !!place,
  });
};

export default useWeather;
