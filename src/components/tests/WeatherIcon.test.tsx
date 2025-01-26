import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import WeatherIcon from '@/components/WeatherIcon';

import { render } from '@/tests/utils/custom-render';

test('WeatherIcon renders correctly', () => {
  render(<WeatherIcon iconname='01d' />);

  const icon = screen.getByRole('img', { name: /weather-icon/i });
  expect(icon).toBeInTheDocument();
});
