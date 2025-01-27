'use client';

import { useEffect } from 'react';

import { format, parseISO } from 'date-fns';

import FavoriteCities from '@/components/FavoriteCities';
import Navbar from '@/components/Navbar';
import WeatherContainer from '@/components/WeatherContainer';
import WeatherDetails from '@/components/WeatherDetails';
import WeatherIcon from '@/components/WeatherIcon';
import WeatherSkeleton from '@/components/WeatherSkeleton';

import useWeather from '@/hooks/useWeather';

import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius';
import { convertKelvinToFahrenheit } from '@/utils/convertKelvinToFahrenheit';
import { convertWindSpeed } from '@/utils/convertWindSpeed';
import { getDayOrNightIcon } from '@/utils/getDayOrNightIcon';
import { getTemperature } from '@/utils/getTemperature';
import { metersToKilometers } from '@/utils/metersToKilometers';

import { useWeatherStore } from '@/store';

const Home = () => {
  const place = useWeatherStore(state => state.place);
  const loadingCity = useWeatherStore(state => state.loadingCity);
  const isCelsius = useWeatherStore(state => state.isCelsius);
  const setIsCelsius = useWeatherStore(state => state.setIsCelsius);
  const { isLoading, error, data: weatherData, refetch } = useWeather(place);
  const weatherDay = weatherData?.list[0];

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

  if (!weatherData || !weatherDay) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <p className='text-red-400'>No weather data available</p>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen flex-col gap-4 overflow-auto bg-gray-100'>
      <Navbar location={weatherData?.city.name} />
      <main className='mx-auto flex w-full max-w-7xl flex-col gap-9 px-3 pt-4 pb-10'>
        <FavoriteCities />
        {loadingCity ? (
          <WeatherSkeleton />
        ) : (
          <section className='space-y-4'>
            <div className='flex flex-col justify-between space-y-2'>
              <h2 className='flex items-end gap-1 text-2xl'>
                <p>{format(parseISO(weatherDay?.dt_txt ?? ''), 'EEEE')}</p>
                <p className='text-lg'>
                  ({format(parseISO(weatherDay?.dt_txt ?? ''), 'dd.MM.yyyy')})
                </p>
              </h2>

              <div className='flex items-center gap-2'>
                <p>°C</p>
                <label className='relative inline-flex cursor-pointer items-center'>
                  <input
                    type='checkbox'
                    value=''
                    className='peer sr-only'
                    checked={!isCelsius}
                    onChange={() => setIsCelsius(!isCelsius)}
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-hidden after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                </label>
                <p>°F</p>
              </div>

              <WeatherContainer className='items-center gap-10 px-6'>
                {/* temprature */}
                <div className='flex flex-col px-4'>
                  <span className='text-5xl'>
                    {getTemperature(weatherDay?.main.temp, isCelsius)}
                  </span>
                  <p className='space-x-1 text-xs whitespace-nowrap'>
                    <span> Feels like</span>
                    <span>
                      {getTemperature(weatherDay?.main.feels_like, isCelsius)}
                    </span>
                  </p>
                  <p className='space-x-2 text-xs'>
                    <span>
                      {getTemperature(weatherDay?.main.temp_min, isCelsius)}↓{' '}
                    </span>
                    <span>
                      {' '}
                      {getTemperature(weatherDay?.main.temp_max, isCelsius)}↑
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
