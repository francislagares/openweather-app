import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import config from '@/config/env';

import { WeatherData } from '@/types/weather';

const useWeather = (place: string) => {
  return useQuery<WeatherData>({
    queryKey: ['weatherData', place],
    queryFn: async () => {
      const { data } = await axios.get(
        `${config.env.baseUrl}forecast?q=${place}&appid=${config.env.apiKey}&cnt=56`,
      );

      return data;
    },
  });
};

export default useWeather;
