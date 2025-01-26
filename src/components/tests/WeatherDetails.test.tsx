import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import WeatherDetails from '@/components/WeatherDetails';

import { render } from '@/tests/utils/custom-render';

test('WeatherDetails renders correctly', () => {
  render(
    <WeatherDetails
      visability='10km'
      humidity='61%'
      windSpeed='7 km/h'
      airPressure='1012 hPa'
      sunrise='6.20'
      sunset='18:48'
    />,
  );

  const visability = screen.getByText('Visability');
  expect(visability).toBeInTheDocument();

  const humidity = screen.getByText('Humidity');
  expect(humidity).toBeInTheDocument();

  const windSpeed = screen.getByText('Wind speed');
  expect(windSpeed).toBeInTheDocument();

  const airPressure = screen.getByText('Air Pressure');
  expect(airPressure).toBeInTheDocument();

  const sunrise = screen.getByText('Sunrise');
  expect(sunrise).toBeInTheDocument();

  const sunset = screen.getByText('Sunset');
  expect(sunset).toBeInTheDocument();
});
