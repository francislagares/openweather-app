'use client';

import { memo, useCallback, useState } from 'react';

import axios from 'axios';
import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from 'react-icons/md';

import config from '@/config/env';

import { useWeatherStore } from '@/store';

import SearchBox from './SearchBox';
import SuggetionBox from './SuggestionBox';

type NavbarProps = { location?: string };

const Navbar = memo(({ location }: NavbarProps) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const setPlace = useWeatherStore(state => state.setPlace);
  const setLoadingCity = useWeatherStore(state => state.setLoadingCity);
  const favoriteCities = useWeatherStore(state => state.favoriteCities);
  const addFavoriteCity = useWeatherStore(state => state.addFavoriteCity);

  const handleInputChange = useCallback(async (value: string) => {
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
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!city.trim()) {
        setError('Please enter a city name');
        return;
      }

      try {
        setLoadingCity(true);
        const response = await axios.get(
          `${config.env.baseUrl}weather?q=${city}&appid=${config.env.apiKey}`,
        );

        if (response.data) {
          setPlace(response.data.name);
          setError('');
          setShowSuggestions(false);
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('City not found. Please try again.');
      } finally {
        setLoadingCity(false);
      }
    },
    [city, setPlace, setLoadingCity],
  );

  const handleSuggestionClick = useCallback((value: string) => {
    setCity(value);
    setShowSuggestions(false);
  }, []);

  const handleCurrentLocation = useCallback(() => {
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
  }, [setPlace, setLoadingCity]);

  const searchBoxOnSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      handleSubmit(e);
    },
    [handleSubmit],
  );

  const searchBoxOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleInputChange(e.target.value);
    },
    [handleInputChange],
  );

  const handleAddToFavorites = () => {
    console.log('city:', city);
    if (city && !favoriteCities.includes(city)) {
      addFavoriteCity(city);
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
            <button
              onClick={handleAddToFavorites}
              className='h-full rounded-r-md bg-blue-500 px-4 py-[9px] text-white hover:bg-blue-600 focus:outline-hidden'
            >
              Add to Favorites
            </button>
            <div className='relative hidden md:flex'>
              <SearchBox
                value={city}
                onSubmit={searchBoxOnSubmit}
                onChange={searchBoxOnChange}
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
          </section>
        </div>
      </nav>
    </>
  );
});

export default Navbar;
