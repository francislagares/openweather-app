const WeatherSkeleton = () => {
  return (
    <section className='space-y-8'>
      {/* Today's data skeleton */}
      <div className='animate-pulse space-y-2'>
        {/* Date skeleton */}
        <div className='flex items-end gap-1 text-2xl'>
          <div className='h-6 w-24 rounded bg-gray-300'></div>
          <div className='h-6 w-24 rounded bg-gray-300'></div>
        </div>

        {/* Time wise temperature skeleton */}
        <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
          {[1, 2, 3, 4].map(index => (
            <div key={index} className='flex flex-col items-center space-y-2'>
              <div className='h-6 w-16 rounded bg-gray-300'></div>
              <div className='h-6 w-6 rounded-full bg-gray-300'></div>
              <div className='h-6 w-16 rounded bg-gray-300'></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeatherSkeleton;
