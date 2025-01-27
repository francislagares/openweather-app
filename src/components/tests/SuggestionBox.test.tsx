import { fireEvent, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import SuggestionBox from '@/components/SuggestionBox';

import { render } from '@/tests/utils/custom-render';

test('SuggestionBox renders correctly with suggestions', async () => {
  render(
    <SuggestionBox
      showSuggestions={true}
      suggestions={['London', 'New York']}
      handleSuggestionClick={() => {}}
      submitError=''
    />,
  );

  const suggestion1 = screen.getByText('London');
  expect(suggestion1).toBeInTheDocument();

  const suggestion2 = screen.getByText('New York');
  expect(suggestion2).toBeInTheDocument();
});

test('SuggestionBox renders correctly with error', async () => {
  render(
    <SuggestionBox
      showSuggestions={true}
      suggestions={[]}
      handleSuggestionClick={() => {}}
      submitError='Location not found'
    />,
  );

  const error = screen.getByText('Location not found');
  expect(error).toBeInTheDocument();
});

test('SuggestionBox does not render when showSuggestions is false', async () => {
  render(
    <SuggestionBox
      showSuggestions={false}
      suggestions={['London', 'New York']}
      handleSuggestionClick={() => {}}
      submitError=''
    />,
  );

  const suggestion1 = screen.queryByText('London');
  expect(suggestion1).not.toBeInTheDocument();

  const suggestion2 = screen.queryByText('New York');
  expect(suggestion2).not.toBeInTheDocument();
});

test('SuggestionBox does not render when suggestions are empty and there is no error', async () => {
  render(
    <SuggestionBox
      showSuggestions={true}
      suggestions={[]}
      handleSuggestionClick={() => {}}
      submitError=''
    />,
  );

  const suggestion1 = screen.queryByText('London');
  expect(suggestion1).not.toBeInTheDocument();

  const suggestion2 = screen.queryByText('New York');
  expect(suggestion2).not.toBeInTheDocument();
});

test('SuggestionBox handleSuggestionClick works correctly', async () => {
  const handleSuggestionClick = vi.fn();
  render(
    <SuggestionBox
      showSuggestions={true}
      suggestions={['London', 'New York']}
      handleSuggestionClick={handleSuggestionClick}
      submitError=''
    />,
  );

  const suggestion1 = screen.getByText('London');

  fireEvent.click(suggestion1);
  expect(handleSuggestionClick).toHaveBeenCalledWith('London');

  const suggestion2 = screen.getByText('New York');

  fireEvent.click(suggestion2);
  expect(handleSuggestionClick).toHaveBeenCalledWith('New York');
});
