import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setBannerData, setTrendingData, setImageURL } from './store/movieSlice';

const API_KEY = "92fe2232aa1304797c7859181c4d7965";

function App() {
  const dispatch = useDispatch();

  const fetchBannerData = async () => {
    try {
      const response = await axios.get(`/movie/popular?api_key=${API_KEY}`);
      dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.error("Error fetching banner data:", error);
    }
  };

  const fetchTrendingData = async () => {
    try {
      const response = await axios.get(`/trending/all/week?api_key=${API_KEY}`);
      dispatch(setTrendingData(response.data.results));
    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  };

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get(`/configuration?api_key=${API_KEY}`);
      dispatch(setImageURL(response.data.images.secure_base_url + "original"));
    } catch (error) {
      console.error('Error fetching configuration:', error);
    }
  };

  useEffect(() => {
    fetchBannerData();
    fetchTrendingData();
    fetchConfiguration();
  }, []);

  return (
    <main className='pb-14 lg:pb-0'>
      <Header />
      <div className='min-h-[90vh]'>
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  );
}

export default App;
