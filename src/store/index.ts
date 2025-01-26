import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WeatherState {
  place: string;
  loadingCity: boolean;
  favoriteCities: string[];
  isCelsius: boolean;
  setPlace: (place: string) => void;
  setLoadingCity: (loading: boolean) => void;
  addFavoriteCity: (city: string) => void;
  removeFavoriteCity: (city: string) => void;
  setIsCelsius: (isCelsius: boolean) => void;
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    set => ({
      place: 'Madrid',
      loadingCity: false,
      favoriteCities: [],
      isCelsius: true,
      setPlace: place => set({ place }),
      setLoadingCity: loading => set({ loadingCity: loading }),
      addFavoriteCity: city =>
        set(state => ({ favoriteCities: [...state.favoriteCities, city] })),
      removeFavoriteCity: city =>
        set(state => ({
          favoriteCities: state.favoriteCities.filter(c => c !== city),
        })),
      setIsCelsius: isCelsius => set({ isCelsius }),
    }),
    {
      name: 'weather-storage',
    },
  ),
);
