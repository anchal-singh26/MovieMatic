import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Card = ({ data, trending, index,media_type }) => {
  const imageURL = useSelector(state => state.movieData.imageURL);
     const mediaType = data.media_type ?? media_type

  return (
     <Link to={"/"+mediaType+"/"+data.id} className='w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative hover:scale-105 transition-all'>
      {data?.poster_path ? (
        <>
          <img
            src={imageURL + data.poster_path}
            // alt={data?.title || data?.name}
            // className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
          />
          <div className='absolute top-4'>
            {trending && (
              <div className='py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden'>
                #{index} Trending
              </div>
            )}
          </div>

          <div className='absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2'>
            <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold'>
              {data?.title || data?.name}
            </h2>
            <div className='text-sm text-neutral-400 flex justify-between items-center'>
              <p>{moment(data.release_date || data.first_air_date).format("MMMM Do YYYY")}</p>
              <p className='bg-black px-1 rounded-full text-xs text-white'>
                Rating: {Number(data.vote_average).toFixed(1)}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className='w-full h-full flex items-center justify-center text-gray-400 text-sm'>
          No Image
        </div>
      )}
    </Link>
  );
};

export default Card;
