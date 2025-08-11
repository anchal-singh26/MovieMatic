import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const BannerHome = () => {
  const bannerData = useSelector(state => state.movieData.bannerData); // keep your slice name
  const imageURL = useSelector(state => state.movieData.imageURL);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentImage > 0) {
      setCurrentImage(prev => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < bannerData.length - 1) {
        handleNext();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage, bannerData.length]);

  return (
    <section className='w-full h-full'>
      <div className='flex min-h-full max-h-[95vh] overflow-hidden relative'>
        {bannerData.map((data, index) => (
          <div
            key={data.id || index}
            className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-transform duration-700 ease-in-out'
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            {/* Banner Image */}
            <div className='w-full h-full'>
              <img
                src={imageURL + data.backdrop_path}
                alt={data.title || data.name}
                className='h-full w-full object-cover'
              />
            </div>

            {/* Navigation Buttons */}
            <div className='absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:flex lg:flex'>
              <button
                onClick={handlePrevious}
                className='bg-white p-2 rounded-full text-black text-xl z-10 hover:bg-gray-200 transition'
                aria-label="Previous"
              >
                <FaAngleLeft />
              </button>
              <button
                onClick={handleNext}
                className='bg-white p-2 rounded-full text-black text-xl z-10 hover:bg-gray-200 transition'
                aria-label="Next"
              >
                <FaAngleRight />
              </button>
            </div>

            {/* Gradient Overlay */}
            <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent' />

            {/* Banner Text Content */}
            <div className='container mx-auto'>
              <div className='w-full absolute bottom-0 max-w-md px-3 pb-5'>
                <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>
                  {data.title || data.name}
                </h2>
                <p className='text-ellipsis line-clamp-3 my-2 text-white'>{data.overview}</p>

                {/* Rating, Views, and Release Date */}
                <div className='flex flex-col gap-1 text-white'>
                  <div className='flex items-center gap-4'>
                    <p>Rating: {Number(data.vote_average).toFixed(1)}</p>
                    <span>|</span>
                    <p>View: {Number(data.popularity).toFixed(0)}</p>
                  </div>
                  <p className='text-sm text-gray-300'>
                    Release Date: {data.release_date || data.first_air_date || "N/A"}
                  </p>
                </div>

                {/* Play Now Button */}
                <Link to={`/${data.media_type || 'movie'}/${data.id}`}>
                  <button className='bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105'>
                    Play Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BannerHome;
