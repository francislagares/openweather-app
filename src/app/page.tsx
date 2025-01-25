'use client';

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

import Navbar from '@/components/Navbar';
import WeatherContainer from '@/components/WeatherContainer';
import WeatherIcon from '@/components/WeatherIcon';

import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius';
import { convertKelvinToFahrenheit } from '@/utils/convertKelvinToFahrenheit';
import { getDayOrNightIcon } from '@/utils/getDayOrNightIcon';

import config from '@/config/env';

import { useWeatherStore } from '@/store';
import { WeatherData } from '@/types/weather';

const Home = () => {
  const [place, setPlace] = useState('London');
  const isCelsius = useWeatherStore(state => state.isCelsius);
  const {
    isLoading,
    error,
    data: weather,
    refetch,
  } = useQuery<WeatherData>({
    queryKey: ['weatherData', place],
    queryFn: async () => {
      const { data } = await axios.get(
        `${config.env.apiEndpoint}forecast?q=${place}&appid=${config.env.apiKey}&cnt=56`,
      );

      console.log('data', data);

      return data;
    },
  });
  const weatherDay = weather?.list[0];

  useEffect(() => {
    refetch();
  }, [place, refetch]);

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
    <main className='flex min-h-screen flex-col gap-4 bg-gray-100'>
      <Navbar />
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
                  : convertKelvinToFahrenheit(weatherDay?.main.temp ?? 296.37)}
                °
              </span>
              <p className='space-x-1 text-xs whitespace-nowrap'>
                <span> Feels like</span>
                <span>
                  {isCelsius
                    ? convertKelvinToCelsius(weatherDay?.main.feels_like ?? 0)
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
                    : convertKelvinToFahrenheit(weatherDay?.main.temp_min ?? 0)}
                  °↓{' '}
                </span>
                <span>
                  {' '}
                  {isCelsius
                    ? convertKelvinToCelsius(weatherDay?.main.temp_max ?? 0)
                    : convertKelvinToFahrenheit(weatherDay?.main.temp_max ?? 0)}
                  °↑
                </span>
              </p>
            </div>
            {/* time  and weather  icon */}
            <div className='flex w-full justify-between gap-10 overflow-x-auto pr-3 sm:gap-16'>
              {weather?.list.map((d, i) => (
                <div
                  key={i}
                  className='flex flex-col items-center justify-between gap-2 text-xs font-semibold'
                >
                  <p className='whitespace-nowrap'>
                    {format(parseISO(d.dt_txt), 'h:mm a')}
                  </p>

                  <WeatherIcon
                    iconname={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)}
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
      </section>
    </main>
  );
};

export default Home;
