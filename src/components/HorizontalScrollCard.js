import React, { useRef } from 'react'
import Card from './Card'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

function HorizontalScrollCard({ data = [], heading, trending,media_type }) {
  const containerRef = useRef();

  const handleNext = () => {
    containerRef.current.scrollLeft += 300;
  };

  const handlePrevious = () => {
    containerRef.current.scrollLeft -= 300; // ✅ fixed typo (contaierRef → containerRef)
  };

  return (
    <div className='container mx-auto px-3 my-10'>
      <h2 className='text-xl lg:text-2xl font-bold mb-3 text-white'>{heading}</h2>
      <div className='relative'>
        <div
          ref={containerRef}
          className='grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-all scrolbar-none'
        >
          {data.length > 0 ? ( // ✅ use data instead of trendingData
            data.map((item, index) => (
              <Card
                key={item.id + "heading" + index}
                data={item}
                index={index + 1}
                trending={true}
                media_type={media_type}
              />
            ))
          ) : (
            <p className='text-gray-400'>No trending shows available</p>
          )}
        </div>
        <div className='absolute top-0 hidden lg:flex justify-between w-full items-center h-full'>
          <button
            onClick={handlePrevious}
            className='bg-white p-1 text-black rounded-full -ml-2 z-10'
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleNext}
            className='bg-white p-1 text-black rounded-full -mr-2 z-10'
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HorizontalScrollCard;
