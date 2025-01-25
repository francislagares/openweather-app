'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import Navbar from '@/components/Navbar';

import config from '@/config/env';

import { WeatherData } from '@/types/weather';

const Home = () => {
  const [place, setPlace] = useState('London');
  const { isLoading, error, data, refetch } = useQuery<WeatherData>({
    queryKey: ['weatherData', place],
    queryFn: async () => {
      const { data } = await axios.get(
        `${config.env.apiEndpoint}forecast?q=${place}&appid=${config.env.apiKey}&cnt=56`,
      );

      console.log('data', data);

      return data;
    },
  });

  return (
    <main className='flex min-h-screen flex-col gap-4 bg-gray-100'>
      <Navbar />
    </main>
  );
};

export default Home;
