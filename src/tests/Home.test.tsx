import { screen, within } from '@testing-library/react';
import { expect, test } from 'vitest';

import Home from '@/app/page';

import { render } from './utils/custom-render';

test('Pages Router', () => {
  render(<Home />);

  const main = within(screen.getByRole('main'));

  expect(main.getByRole('heading', { name: /Weather/i })).toBeInTheDocument();
});
