import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io";
import type { RootState } from "../../store";

interface SocketState {
  loaded: boolean;
  connection: Socket | null;
}

const initialState: SocketState = {
  loaded: false,
  connection: null,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, { payload }) => {
      if (!payload) {
        if (state.loaded) {
          return {
            ...state,
            connection: payload,
            loaded: false,
          };
        }

        if (!state.loaded) {
          return state;
        }
      }
      return {
        ...state,
        connection: payload,
        loaded: true,
      };
    },
  },
});

const { actions, reducer: socketReducer } = socketSlice;

export const { setSocket } = actions;

export const selectSocketLoaded = (state: RootState) => state.socket.loaded;
export const selectSocket = (state: RootState) => state.socket.connection;

export default socketReducer;
