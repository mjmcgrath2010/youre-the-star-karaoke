import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface Song {
  _id: string;
  title: string;
  artist: string;
  diskNumber: string;
}

const songsAdapter = createEntityAdapter<Song>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (song) => song._id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const songsSelectors = songsAdapter.getSelectors<RootState>(
  ({ songs }) => songs.items
);

export const songsSlice = createSlice({
  name: "user",
  initialState: { items: songsAdapter.getInitialState(), loaded: false },
  reducers: {
    setSongs: (state, { payload }) => {
      if (state.loaded) {
        return;
      }
      songsAdapter.setAll(state.items, payload);
      state.loaded = true;
    },
  },
});

const { actions, reducer: songsReducer } = songsSlice;

export const { setSongs } = actions;

export const { selectById, selectIds, selectEntities } = songsSelectors;

export const selectSongsLoaded = (state: RootState) => state.songs.loaded;
export const selectSongs = (state: RootState) =>
  songsSelectors.selectAll(state);

export default songsReducer;
