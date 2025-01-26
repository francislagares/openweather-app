'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

import FavoriteCities from '@/components/FavoriteCities';
import Navbar from '@/components/Navbar';
import WeatherContainer from '@/components/WeatherContainer';
import WeatherDetails from '@/components/WeatherDetails';
import WeatherIcon from '@/components/WeatherIcon';
import WeatherSkeleton from '@/components/WeatherSkeleton';

import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius';
import { convertKelvinToFahrenheit } from '@/utils/convertKelvinToFahrenheit';
import { convertWindSpeed } from '@/utils/convertWindSpeed';
import { getDayOrNightIcon } from '@/utils/getDayOrNightIcon';
import { metersToKilometers } from '@/utils/metersToKilometers';

import config from '@/config/env';

import { useWeatherStore } from '@/store';
import { WeatherData } from '@/types/weather';

const Home = () => {
  const [city, setCity] = useState('');
  const place = useWeatherStore(state => state.place);
  const loadingCity = useWeatherStore(state => state.loadingCity);
  const favoriteCities = useWeatherStore(state => state.favoriteCities);
  const addFavoriteCity = useWeatherStore(state => state.addFavoriteCity);
  const isCelsius = useWeatherStore(state => state.isCelsius);
  const {
    isLoading,
    error,
    data: weatherData,
  } = useQuery<WeatherData>({
    queryKey: ['weatherData', place],
    queryFn: async () => {
      const { data } = await axios.get(
        `${config.env.baseUrl}forecast?q=${place}&appid=${config.env.apiKey}&cnt=56`,
      );

      return data;
    },
  });
  const weatherDay = weatherData?.list[0];

  const handleAddToFavorites = () => {
    if (city && !favoriteCities.includes(city)) {
      addFavoriteCity(city);
    }
  };

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p className='animate-bounce'>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p className='text-red-400'>{error.message}</p>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen flex-col gap-4 bg-gray-100'>
      <Navbar location={weatherData?.city.name} />
      <main className='mx-auto flex w-full max-w-7xl flex-col gap-9 px-3 pt-4 pb-10'>
        <FavoriteCities />
        {loadingCity ? (
          <WeatherSkeleton />
        ) : (
          <section className='space-y-4'>
            <div className='space-y-2'>
              <h2 className='flex items-end gap-1 text-2xl'>
                <p>{format(parseISO(weatherDay?.dt_txt ?? ''), 'EEEE')}</p>
                <p className='text-lg'>
                  ({format(parseISO(weatherDay?.dt_txt ?? ''), 'dd.MM.yyyy')})
                </p>
              </h2>
              <WeatherContainer className='items-center gap-10 px-6'>
                {/* temprature */}
                <div className='flex flex-col px-4'>
                  <span className='text-5xl'>
                    {isCelsius
                      ? convertKelvinToCelsius(weatherDay?.main.temp ?? 296.37)
                      : convertKelvinToFahrenheit(
                          weatherDay?.main.temp ?? 296.37,
                        )}
                    °
                  </span>
                  <p className='space-x-1 text-xs whitespace-nowrap'>
                    <span> Feels like</span>
                    <span>
                      {isCelsius
                        ? convertKelvinToCelsius(
                            weatherDay?.main.feels_like ?? 0,
                          )
                        : convertKelvinToFahrenheit(
                            weatherDay?.main.feels_like ?? 0,
                          )}
                      °
                    </span>
                  </p>
                  <p className='space-x-2 text-xs'>
                    <span>
                      {isCelsius
                        ? convertKelvinToCelsius(weatherDay?.main.temp_min ?? 0)
                        : convertKelvinToFahrenheit(
                            weatherDay?.main.temp_min ?? 0,
                          )}
                      °↓{' '}
                    </span>
                    <span>
                      {' '}
                      {isCelsius
                        ? convertKelvinToCelsius(weatherDay?.main.temp_max ?? 0)
                        : convertKelvinToFahrenheit(
                            weatherDay?.main.temp_max ?? 0,
                          )}
                      °↑
                    </span>
                  </p>
                </div>
                {/* time  and weather  icon */}
                <div className='flex w-full justify-between gap-10 overflow-x-auto pr-3 sm:gap-16'>
                  {weatherData?.list.map((d, i) => (
                    <div
                      key={i}
                      className='flex flex-col items-center justify-between gap-2 text-xs font-semibold'
                    >
                      <p className='whitespace-nowrap'>
                        {format(parseISO(d.dt_txt), 'h:mm a')}
                      </p>

                      <WeatherIcon
                        iconname={getDayOrNightIcon(
                          d.weather[0].icon,
                          d.dt_txt,
                        )}
                      />
                      <p>
                        {isCelsius
                          ? convertKelvinToCelsius(d?.main.temp ?? 0)
                          : convertKelvinToFahrenheit(d?.main.temp ?? 0)}
                        °
                      </p>
                    </div>
                  ))}
                </div>
              </WeatherContainer>
            </div>

            <div className='flex gap-4'>
              {/* left  */}
              <WeatherContainer className='w-fit flex-col items-center justify-center px-4'>
                <p className='text-center capitalize'>
                  {weatherDay?.weather[0].description}{' '}
                </p>
                <WeatherIcon
                  iconname={getDayOrNightIcon(
                    weatherDay?.weather[0].icon ?? '',
                    weatherDay?.dt_txt ?? '',
                  )}
                />
              </WeatherContainer>
              {/* right  */}
              <WeatherContainer className='justify-between gap-4 overflow-x-auto bg-yellow-300/80 px-6'>
                <WeatherDetails
                  visability={metersToKilometers(
                    weatherDay?.visibility ?? 10000,
                  )}
                  airPressure={`${weatherDay?.main.pressure} hPa`}
                  humidity={`${weatherDay?.main.humidity}%`}
                  sunrise={format(
                    weatherData?.city.sunrise ?? 1702949452,
                    'H:mm',
                  )}
                  // sunrise={}
                  sunset={format(
                    weatherData?.city.sunset ?? 1702517657,
                    'H:mm',
                  )}
                  windSpeed={convertWindSpeed(weatherDay?.wind.speed ?? 1.64)}
                />
              </WeatherContainer>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;
