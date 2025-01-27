import { useState } from 'react';

import axios from 'axios';

import config from '@/config/env';

const useWeatherSuggestions = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = async (query: string) => {
    if (query.length >= 3) {
      try {
        const response = await axios.get(
          `${config.env.baseUrl}find?q=${query}&appid=${config.env.apiKey}`,
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
        setError('Failed to fetch suggestions. Please try again later.');
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  return {
    suggestions,
    error,
    showSuggestions,
    fetchSuggestions,
    setShowSuggestions,
  };
};

export default useWeatherSuggestions;
