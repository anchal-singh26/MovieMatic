import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bannerData: [],
  trendingData: [],
  imageURL: ""
};

export const movieSlice = createSlice({
  name: "movieData",
  initialState,
  reducers: {
    setBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
    setTrendingData: (state, action) => {
      state.trendingData = action.payload;
    },
    setImageURL: (state, action) => {
      state.imageURL = action.payload;
    }
  }
});

export const { setBannerData, setTrendingData, setImageURL } = movieSlice.actions;
export default movieSlice.reducer;
