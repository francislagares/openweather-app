'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

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
  const setPlace = useWeatherStore(state => state.setPlace);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const router = useRouter();

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

  const handleCityClick = (city: string) => {
    setPlace(city);
    router.push(`/?city=${city}`);
  };

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
            className='flex w-fit items-center justify-between rounded-md bg-white p-2 hover:bg-gray-200'
          >
            <button
              onClick={() => handleCityClick(cityName)}
              className='flex cursor-pointer items-center gap-2'
            >
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
            </button>
            <button
              onClick={() => handleRemoveFavorite(cityName)}
              className='cursor-pointer rounded-full p-1'
            >
              <IoClose />
            </button>
          </div>
        );
      })
      .filter(Boolean);
  }, [weatherData, isCelsius, handleRemoveFavorite, setPlace, router]);

  return (
    <div className='mt-4 flex flex-col gap-2'>
      <h2 className='text-2xl'>Favorite Cities</h2>
      <div className='scrollbar-hide flex w-full overflow-x-auto'>
        <div className='flex flex-row gap-2'>{renderFavoriteCities}</div>
      </div>
    </div>
  );
}
