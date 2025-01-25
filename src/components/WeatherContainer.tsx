/** @format */

import React from 'react';

import { cn } from '@/lib/utils';

const WeatherContainer = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn(
        'flex w-full rounded-xl border bg-white py-4 shadow-xs',
        props.className,
      )}
    />
  );
};

export default WeatherContainer;
