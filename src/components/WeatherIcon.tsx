import React from 'react';

import Image from 'next/image';

import { cn } from '@/lib/utils';

const WeatherIcon = (
  props: React.HTMLProps<HTMLDivElement> & { iconname: string },
) => {
  return (
    <div title={props.iconname} {...props} className={cn('relative h-20 w-20')}>
      <Image
        width={100}
        height={100}
        alt='weather-icon'
        className='absolute h-full w-full'
        priority={true}
        src={`https://openweathermap.org/img/wn/${props.iconname}@4x.png`}
      />
    </div>
  );
};

export default WeatherIcon;
