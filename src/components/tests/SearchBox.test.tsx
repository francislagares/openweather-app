import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import SearchBox from '@/components/SearchBox';

import { render } from '@/tests/utils/custom-render';

test('SearchBox renders correctly', () => {
  render(<SearchBox value='' onChange={() => {}} onSubmit={() => {}} />);

  const searchInput = screen.getByPlaceholderText(/Search location../i);
  expect(searchInput).toBeInTheDocument();

  const searchButton = screen.getByRole('button');
  expect(searchButton).toBeInTheDocument();
});
