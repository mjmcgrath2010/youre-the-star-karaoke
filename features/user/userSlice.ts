import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface UserState {
  id: string | null;
}

const initialState: UserState = {
  id: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, { payload }) => {
      return {
        ...state,
        id: payload,
      };
    },
  },
});

const { actions, reducer: userReducer } = userSlice;

export const { setUserId } = actions;

export const selectUserId = (state: RootState) => state.user.id;

export default userReducer;
