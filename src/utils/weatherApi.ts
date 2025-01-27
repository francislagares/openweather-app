import config from '@/config/env';

export const getWeatherByCityUrl = (city: string) =>
  `${config.env.baseUrl}weather?q=${city}&appid=${config.env.apiKey}`;

export const getSuggestionsUrl = (query: string) =>
  `${config.env.baseUrl}find?q=${query}&appid=${config.env.apiKey}`;

export const getWeatherByCoordsUrl = (lat: number, lon: number) =>
  `${config.env.baseUrl}weather?lat=${lat}&lon=${lon}&appid=${config.env.apiKey}`;
