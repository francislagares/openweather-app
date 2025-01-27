import React, { memo, useCallback } from 'react';

import { IoSearch } from 'react-icons/io5';

import { cn } from '@/lib/utils';

type SearchBoxProps = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLFormElement> | undefined;
};

const SearchBox = memo((props: SearchBoxProps) => {
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (props.onSubmit) {
        props.onSubmit(e);
      }
    },
    [props.onSubmit],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'relative flex h-10 items-center justify-center',
        props.className,
      )}
    >
      <input
        type='text'
        value={props.value}
        onChange={props.onChange}
        placeholder='Search location..'
        className='h-full w-[230px] rounded-l-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-hidden'
      />
      <button
        type='submit'
        className='h-full rounded-r-md bg-blue-500 px-4 py-[9px] text-white hover:bg-blue-600 focus:outline-hidden'
      >
        <IoSearch />
      </button>
    </form>
  );
});

export default SearchBox;
