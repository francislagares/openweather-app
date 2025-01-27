import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius';

import WeatherContainer from './WeatherContainer';
import WeatherDetails, { WeatherDetailProps } from './WeatherDetails';
import WeatherIcon from './WeatherIcon';

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export default function ForecastWeatherDetail(
  props: ForecastWeatherDetailProps,
) {
  const {
    weatherIcon = '02d',
    date = '19.09',
    day = 'Tuesday',
    temp,
    feels_like,
    description,
  } = props;

  return (
    <WeatherContainer className='gap-4'>
      {/* left */}
      <section className='flex items-center gap-4 px-4'>
        <div className='flex flex-col items-center gap-1'>
          <WeatherIcon iconname={weatherIcon} />
          <p>{date}</p>
          <p className='text-sm'>{day} </p>
        </div>

        {/*  */}
        <div className='flex flex-col px-4'>
          <span className='text-5xl'>{convertKelvinToCelsius(temp ?? 0)}°</span>
          <p className='space-x-1 text-xs whitespace-nowrap'>
            <span> Feels like</span>
            <span>{convertKelvinToCelsius(feels_like ?? 0)}°</span>
          </p>
          <p className='capitalize'> {description}</p>
        </div>
      </section>
      {/* right */}
      <section className='flex w-full justify-between gap-4 overflow-x-auto px-4 pr-10'>
        <WeatherDetails {...props} />
      </section>
    </WeatherContainer>
  );
}
