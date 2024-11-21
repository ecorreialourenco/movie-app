import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Options } from "../../models";

export interface MovieStore {
  showAdultContent: boolean;
  sortBy: Options | null;
  genresList: Options[];
  selectedGenre: Options | null;
}

const initialState: MovieStore = {
  showAdultContent: false,
  sortBy: null,
  genresList: [],
  selectedGenre: null,
};

export const movieStore = createSlice({
  name: "movieStore",
  initialState,
  reducers: {
    setAdultContent: (state, action: PayloadAction<boolean>) => {
      state.showAdultContent = action.payload;
    },
    setSortBy: (state, action: PayloadAction<Options | null>) => {
      state.sortBy = action.payload;
    },
    setGenresList: (state, action: PayloadAction<Options[]>) => {
      state.genresList = action.payload;
    },
    setSelectedGenre: (state, action: PayloadAction<Options | null>) => {
      state.selectedGenre = action.payload;
    },
  },
});

export const { setAdultContent, setSortBy, setGenresList, setSelectedGenre } =
  movieStore.actions;

export default movieStore.reducer;
