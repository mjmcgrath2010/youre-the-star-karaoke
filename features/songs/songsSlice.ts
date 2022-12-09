import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface Song {
  _id: string;
  title: string;
  artist: string;
  diskNumber: string;
}

interface SongsState {
  items: Song[];
  loaded: boolean;
}

const initialState: SongsState = {
  items: [],
  loaded: false,
};

export const songsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSongs: (state, { payload }) => {
      return {
        ...state,
        items: payload,
        loaded: true,
      };
    },
  },
});

const { actions, reducer: songsReducer } = songsSlice;

export const { setSongs } = actions;

export const selectSongsLoaded = (state: RootState) => state.songs.loaded;
export const selectSongs = (state: RootState) => state.songs.items;

export default songsReducer;
