import { memo, useMemo } from 'react';

const SuggestionBox = memo(
  ({
    showSuggestions,
    suggestions,
    handleSuggestionClick,
    submitError,
  }: {
    showSuggestions: boolean;
    suggestions: string[];
    handleSuggestionClick: (item: string) => void;
    submitError: string;
  }) => {
    const memoizedSuggestions = useMemo(
      () =>
        suggestions.map((item, i) => (
          <li
            key={`${item}-${i}`}
            onClick={() => handleSuggestionClick(item)}
            className='cursor-pointer rounded p-1 hover:bg-gray-200'
          >
            {item}
          </li>
        )),
      [suggestions, handleSuggestionClick],
    );

    if (!((showSuggestions && suggestions.length > 1) || submitError)) {
      return null;
    }

    return (
      <ul className='absolute top-[44px] left-0 mb-4 flex min-w-[200px] flex-col gap-1 rounded-md border border-gray-300 bg-white px-2 py-2'>
        {submitError && suggestions.length < 1 && (
          <li className='p-1 text-red-500'>{submitError}</li>
        )}
        {memoizedSuggestions}
      </ul>
    );
  },
);

export default SuggestionBox;
