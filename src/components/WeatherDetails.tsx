import React from 'react';

import { FiDroplet } from 'react-icons/fi';
import { ImMeter } from 'react-icons/im';
import { LuEye, LuSunrise, LuSunset } from 'react-icons/lu';
import { MdAir } from 'react-icons/md';

export interface WeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}

const WeatherDetail = (props: WeatherDetailProps) => {
  return (
    <div className='flex flex-col items-center justify-between gap-2 text-xs font-semibold text-black/80'>
      <p className='whitespace-nowrap'>{props.information}</p>
      <div className='text-3xl'>{props.icon}</div>
      <p>{props.value}</p>
    </div>
  );
};

export interface WeatherDetailsProps {
  visability: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

const WeatherDetails = (props: WeatherDetailsProps) => {
  const {
    visability = '25km',
    humidity = '61%',
    windSpeed = '7 km/h',
    airPressure = '1012 hPa',
    sunrise = '6.20',
    sunset = '18:48',
  } = props;

  return (
    <>
      <WeatherDetail
        icon={<LuEye />}
        information='Visability'
        value={visability}
      />
      <WeatherDetail
        icon={<FiDroplet />}
        information='Humidity'
        value={humidity}
      />
      <WeatherDetail
        icon={<MdAir />}
        information='Wind speed'
        value={windSpeed}
      />
      <WeatherDetail
        icon={<ImMeter />}
        information='Air Pressure'
        value={airPressure}
      />
      <WeatherDetail
        icon={<LuSunrise />}
        information='Sunrise'
        value={sunrise}
      />
      <WeatherDetail icon={<LuSunset />} information='Sunset' value={sunset} />
    </>
  );
};

export default WeatherDetails;
