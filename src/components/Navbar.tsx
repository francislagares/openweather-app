'use client';

import { useState } from 'react';

import axios from 'axios';
import {
  MdFavorite,
  MdMyLocation,
  MdOutlineFavoriteBorder,
  MdOutlineLocationOn,
  MdWbSunny,
} from 'react-icons/md';

import config from '@/config/env';

import { useWeatherStore } from '@/store';

import SearchBox from './SearchBox';
import SuggetionBox from './SuggestionBox';

type NavbarProps = { location?: string };

const Navbar = ({ location }: NavbarProps) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const setPlace = useWeatherStore(state => state.setPlace);
  const setLoadingCity = useWeatherStore(state => state.setLoadingCity);
  const favoriteCities = useWeatherStore(state => state.favoriteCities);
  const addFavoriteCity = useWeatherStore(state => state.addFavoriteCity);
  const removeFavoriteCity = useWeatherStore(state => state.removeFavoriteCity);
  const setIsCelsius = useWeatherStore(state => state.setIsCelsius);
  const isCelsius = useWeatherStore(state => state.isCelsius);

  const handleInputChange = async (value: string) => {
    setCity(value);

    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `${config.env.baseUrl}find?q=${value}&appid=${config.env.apiKey}`,
        );

        const suggestions = response.data.list.map(
          (sugggestion: { name: string }) => sugggestion.name,
        );

        setSuggestions(suggestions);
        setError('');
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);

        setSuggestions([]);
        setError('Failed to fetch suggestions');
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    setLoadingCity(true);
    e.preventDefault();

    if (suggestions.length === 0) {
      setError('Location not found');
      setLoadingCity(false);
    } else {
      setError('');

      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestions(false);
      }, 500);
    }
  };

  const handleSuggestionClick = (value: string) => {
    setCity(value);
    setShowSuggestions(false);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async postiion => {
        const { latitude, longitude } = postiion.coords;

        try {
          setLoadingCity(true);
          const response = await axios.get(
            `${config.env.baseUrl}weather?lat=${latitude}&lon=${longitude}&appid=${config.env.apiKey}`,
          );
          setTimeout(() => {
            setLoadingCity(false);
            setPlace(response.data.name);
          }, 500);
        } catch (error) {
          setLoadingCity(false);
          console.log('Error fetching current location:', error);
        }
      });
    }
  };

  const handleFavoriteClick = () => {
    if (location) {
      if (favoriteCities.includes(location)) {
        removeFavoriteCity(location);
      } else {
        addFavoriteCity(location);
      }
    }
  };

  return (
    <>
      <nav className='sticky top-0 left-0 z-50 bg-white shadow-xs'>
        <div className='mx-auto flex h-[80px] w-full max-w-7xl items-center justify-between px-3'>
          <h2 className='flex items-center justify-center gap-2 text-3xl text-gray-500'>
            Weather
            <MdWbSunny className='mt-1 text-3xl text-yellow-300' />
          </h2>
          <section className='flex items-center gap-2'>
            <MdMyLocation
              title='Your Current Location'
              onClick={handleCurrentLocation}
              className='cursor-pointer text-2xl text-gray-400 hover:opacity-80'
            />
            <MdOutlineLocationOn className='text-3xl' />
            <p className='text-sm text-slate-900/80'>{location}</p>
            <div className='relative hidden md:flex'>
              <SearchBox
                value={city}
                onSubmit={handleSubmitSearch}
                onChange={e => handleInputChange(e.target.value)}
              />
              <SuggetionBox
                {...{
                  showSuggestions,
                  suggestions,
                  handleSuggestionClick,
                  error,
                }}
              />
            </div>
            {location && (
              <button onClick={handleFavoriteClick}>
                {favoriteCities.includes(location) ? (
                  <MdFavorite className='text-2xl text-red-500' />
                ) : (
                  <MdOutlineFavoriteBorder className='text-2xl' />
                )}
              </button>
            )}

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
          </section>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
