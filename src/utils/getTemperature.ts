import { convertKelvinToCelsius } from './convertKelvinToCelsius';
import { convertKelvinToFahrenheit } from './convertKelvinToFahrenheit';

export const getTemperature = (
  temp: number | undefined,
  isCelsius: boolean,
) => {
  if (temp === undefined) return '0°';
  return isCelsius
    ? `${convertKelvinToCelsius(temp)}°`
    : `${convertKelvinToFahrenheit(temp)}°`;
};
