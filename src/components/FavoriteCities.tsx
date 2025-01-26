'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';

import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { IoClose } from 'react-icons/io5';

import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius';
import { convertKelvinToFahrenheit } from '@/utils/convertKelvinToFahrenheit';
import { getDayOrNightIcon } from '@/utils/getDayOrNightIcon';

import config from '@/config/env';

import { useWeatherStore } from '@/store';
import { WeatherData } from '@/types/weather';

import WeatherIcon from './WeatherIcon';

const fetchCityWeather = async (city: string) => {
  try {
    const response = await axios.get(
      `${config.env.baseUrl}forecast?q=${city}&appid=${config.env.apiKey}&cnt=56`,
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch weather data for ${city}`, error);
    return null;
  }
};

export default function FavoriteCities() {
  const favoriteCities = useWeatherStore(state => state.favoriteCities);
  const isCelsius = useWeatherStore(state => state.isCelsius);
  const removeFavoriteCity = useWeatherStore(state => state.removeFavoriteCity);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  const fetchWeatherData = useCallback(async () => {
    const data = await Promise.all(favoriteCities.map(fetchCityWeather));
    setWeatherData(data.filter(Boolean) as WeatherData[]);
  }, [favoriteCities]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteCities');
    if (storedFavorites) {
      useWeatherStore.setState({ favoriteCities: JSON.parse(storedFavorites) });
    }
  }, []);

  const handleRemoveFavorite = useCallback(
    (cityToRemove: string) => {
      removeFavoriteCity(cityToRemove);
      const updatedFavorites = favoriteCities.filter(
        city => city !== cityToRemove,
      );
      localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
    },
    [favoriteCities, removeFavoriteCity],
  );

  const renderFavoriteCities = useMemo(() => {
    return weatherData
      .map((data, index) => {
        if (!data) return null;

        const cityName = data.city.name;
        const temperature = isCelsius
          ? convertKelvinToCelsius(data.list[0].main.temp)
          : convertKelvinToFahrenheit(data.list[0].main.temp);
        const weatherIcon = getDayOrNightIcon(
          data.list[0].weather[0].icon,
          data.list[0].dt_txt,
        );

        return (
          <div
            key={`${cityName}-${index}`}
            className='flex items-center justify-between rounded-md bg-gray-100 p-2'
          >
            <div className='flex items-center gap-2'>
              <WeatherIcon iconname={weatherIcon} />
              <div>
                <p className='text-sm font-semibold'>{cityName}</p>
                <p className='text-xs text-gray-500'>
                  {format(parseISO(data.list[0].dt_txt), 'EEEE, HH:mm')}
                </p>
              </div>
              <p className='ml-2 text-lg font-bold'>
                {temperature.toFixed(0)}°{isCelsius ? 'C' : 'F'}
              </p>
            </div>
            <button
              onClick={() => handleRemoveFavorite(cityName)}
              className='rounded-full p-1 hover:bg-gray-200'
            >
              <IoClose />
            </button>
          </div>
        );
      })
      .filter(Boolean);
  }, [weatherData, isCelsius, handleRemoveFavorite]);

  return <div className='mt-4 flex flex-col gap-2'>{renderFavoriteCities}</div>;
}
