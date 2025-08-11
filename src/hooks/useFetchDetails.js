import axios from "axios";
import { useEffect, useState } from "react";

// TMDB API Base URL
const API_BASE = "https://api.themoviedb.org/3";
// Your API Key
const API_KEY = "92fe2232aa1304797c7859181c4d7965";

const useFetchDetails = (endpoint) => {
  const [data, setData] = useState(null); // default null instead of undefined
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // added error handling

  const fetchData = async () => {
    if (!endpoint) {
      console.warn("useFetchDetails: endpoint is undefined");
      return;
    }
    try {
      setLoading(true);
      setError(null);

      const url = `${API_BASE}${endpoint}?api_key=${API_KEY}&language=en-US`;
      const response = await axios.get(url);

      setData(response.data);
    } catch (err) {
      console.error("API Fetch Error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]); // runs when endpoint changes

  return { data, loading, error };
};

export default useFetchDetails;
