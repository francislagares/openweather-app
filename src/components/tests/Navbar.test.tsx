import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import Navbar from '@/components/Navbar';

import { render } from '@/tests/utils/custom-render';

const mockGeolocation = {
  getCurrentPosition: vi.fn().mockImplementation(success =>
    success({
      coords: {
        latitude: 51.5074,
        longitude: 0.1278,
      },
    }),
  ),
};

Object.defineProperty(global, 'navigator', {
  value: {
    geolocation: mockGeolocation,
  },
});

describe('Navbar Component', () => {
  test('Navbar renders correctly', async () => {
    render(<Navbar />);

    const heading = screen.getByRole('heading', { name: /Weather/i });
    expect(heading).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/Search location../i);
    expect(searchInput).toBeInTheDocument();
  });

  test('Navbar search input works correctly', async () => {
    render(<Navbar />);

    const searchInput = screen.getByPlaceholderText(/Search location../i);

    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'London' } });
    expect(searchInput).toHaveValue('London');
  });
});
