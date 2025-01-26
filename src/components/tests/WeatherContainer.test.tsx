import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import WeatherContainer from '@/components/WeatherContainer';

import { render } from '@/tests/utils/custom-render';

test('WeatherContainer renders correctly', () => {
  render(<WeatherContainer>Test</WeatherContainer>);

  const container = screen.getByText('Test');
  expect(container).toBeInTheDocument();
});
