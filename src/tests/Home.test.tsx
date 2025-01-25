import { screen, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';

import Home from '@/app/page';

import { render } from './utils/custom-render';

test('Pages Router', async () => {
  render(<Home />);

  const heading = screen.findByRole('heading', { name: /Weather/i });

  waitFor(() => {
    expect(heading).toBeInTheDocument();
  });
});
