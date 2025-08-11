import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Spinner from '../components/Spinner'; // assuming you added spinner component

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Parse query param 'q' from URL
  const getQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('q') || '';
  };
  const query = getQuery();

  // Fetch function with loading handling
  const fetchData = async () => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/multi`, {
        params: {
          api_key: '92fe2232aa1304797c7859181c4d7965',
          query: decodeURIComponent(query),
          page: page,
        },
      });

      setTotalResults(response.data.total_results);

      setData((prev) => {
        const merged = page === 1 ? response.data.results : [...prev, ...response.data.results];
        // Remove duplicates by id
        const unique = merged.filter(
          (item, index, self) => index === self.findIndex((t) => t.id === item.id)
        );
        return unique;
      });
    } catch (err) {
      console.error(err);
      setError('Failed to load search results. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Reset data when query changes
  useEffect(() => {
    setPage(1);
    setData([]);
    setTotalResults(null);
    setError(null);

    if (query) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [query]);

  // Fetch more data on page change (except initial load)
  useEffect(() => {
    if (page > 1 && query) {
      fetchData();
    }
  }, [page]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='py-16'>
      {/* Mobile search bar */}
      <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
        <input
          type='text'
          placeholder='Search here...'
          onChange={(e) => navigate(`/search?q=${encodeURIComponent(e.target.value)}`)}
          value={query}
          className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900'
        />
      </div>

      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Search Results</h3>

        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="text-center text-red-500 mt-10 text-lg">{error}</p>
        ) : totalResults === 0 ? (
          <p className="text-center text-gray-500 mt-10 text-lg">
            No movies found. Please try another search.
          </p>
        ) : (
          <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
            {data.map((searchData) => (
              <Card
                data={searchData}
                key={`${searchData.id}-${searchData.media_type || 'search'}`}
                media_type={searchData.media_type}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
