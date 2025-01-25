import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from 'react-icons/md';

const Navbar = () => {
  return (
    <>
      <nav className='sticky top-0 left-0 z-50 bg-white shadow-xs'>
        <div className='mx-auto flex h-[80px] w-full max-w-7xl items-center justify-between px-3'>
          <h2 className='flex items-center justify-center gap-2 text-3xl text-gray-500'>
            Weather
            <MdWbSunny className='mt-1 text-3xl text-yellow-300' />
          </h2>
          <section className='flex items-center gap-2'>
            <MdMyLocation
              title='Your Current Location'
              className='cursor-pointer text-2xl text-gray-400 hover:opacity-80'
            />
            <MdOutlineLocationOn className='text-3xl' />
            <p className='text-sm text-slate-900/80'>Default Location</p>
            <div className='relative hidden md:flex'>{/* SearchBox */}</div>
          </section>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
