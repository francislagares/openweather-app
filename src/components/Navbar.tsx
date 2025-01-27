'use client';

import { useCallback, useState } from 'react';

import axios from 'axios';
import {
  MdFavorite,
  MdMyLocation,
  MdOutlineFavoriteBorder,
  MdOutlineLocationOn,
  MdWbSunny,
} from 'react-icons/md';

import useWeatherSuggestions from '@/hooks/useWeatherSuggestions';

import { getWeatherByCoordsUrl } from '@/utils/weatherApi';

import { useWeatherStore } from '@/store';

import SearchBox from './SearchBox';
import SuggetionBox from './SuggestionBox';

type NavbarProps = { location?: string };

const Navbar = ({ location }: NavbarProps) => {
  const [city, setCity] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');
  const setPlace = useWeatherStore(state => state.setPlace);
  const setLoadingCity = useWeatherStore(state => state.setLoadingCity);
  const favoriteCities = useWeatherStore(state => state.favoriteCities);
  const addFavoriteCity = useWeatherStore(state => state.addFavoriteCity);
  const removeFavoriteCity = useWeatherStore(state => state.removeFavoriteCity);
  const { suggestions, showSuggestions, fetchSuggestions, setShowSuggestions } =
    useWeatherSuggestions();

  const handleInputChange = useCallback(
    (value: string) => {
      setCity(value);
      fetchSuggestions(value);
    },
    [fetchSuggestions],
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleInputChange(e.target.value);
    },
    [handleInputChange],
  );

  const updateLocation = (location: string) => {
    setLoadingCity(true);
    setTimeout(() => {
      setLoadingCity(false);
      setPlace(location);
      setShowSuggestions(false);
    }, 500);
  };

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (suggestions.length === 0) {
      setSubmitError('Location not found');
      setLoadingCity(false);
    } else {
      setSubmitError('');
      updateLocation(city);
    }
  };

  const handleSuggestionClick = (value: string) => {
    setCity(value);
    setShowSuggestions(false);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.get(
            getWeatherByCoordsUrl(latitude, longitude),
          );

          updateLocation(response.data.name);
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
      <nav className='sticky top-0 left-0 z-50 bg-white py-8 shadow-xs sm:py-4'>
        <div className='mx-auto flex h-[100px] w-full max-w-7xl flex-col items-center justify-between gap-2 px-3 sm:h-[80px] sm:flex-row sm:gap-0'>
          {/* Weather Title */}
          <h2 className='flex items-center justify-center gap-2 text-3xl text-gray-500'>
            Weather
            <MdWbSunny className='mt-1 text-3xl text-yellow-300' />
          </h2>

          {/* Icons and Search Section */}
          <section className='flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-2'>
            {/* Icons */}
            <div className='flex items-center gap-2'>
              <MdMyLocation
                title='Your Current Location'
                onClick={handleCurrentLocation}
                className='cursor-pointer text-2xl text-gray-400 hover:opacity-80'
              />
              <MdOutlineLocationOn className='text-3xl' />
              <p className='text-sm text-slate-900/80'>{location}</p>
              {location && (
                <button onClick={handleFavoriteClick}>
                  {favoriteCities.includes(location) ? (
                    <MdFavorite className='text-2xl text-red-500' />
                  ) : (
                    <MdOutlineFavoriteBorder className='text-2xl' />
                  )}
                </button>
              )}
            </div>

            {/* Search Box and Suggestions */}
            <div className='relative w-full sm:w-auto'>
              <SearchBox
                value={city}
                onSubmit={handleSubmitSearch}
                onChange={handleSearchChange}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleSubmitSearch(e);
                  }
                }}
                aria-label='Search for a city'
              />
              <SuggetionBox
                {...{
                  showSuggestions,
                  suggestions,
                  handleSuggestionClick,
                  submitError,
                }}
              />
            </div>
          </section>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
