import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';
import { roomInfo } from '../../../utils/types';

// Type for our state
export interface roomListState {
  list: roomInfo[];
  loading: boolean;
}

const roomListInitialState: roomInfo[] = [];

// Initial state
const initialState: roomListState = {
  list: roomListInitialState,
  loading: false,
};

// Actual Slice
export const roomListSlice = createSlice({
  name: 'roomList',
  initialState,
  reducers: {
    requestRoomList(state, action) {
      state.loading = true;
      state.list = roomListInitialState;
    },

    setRoomList(state, action) {
      state.loading = false;
      state.list = action.payload;
    },

    clearRoomList(state, action) {
      state.loading = false;
      state.list = roomListInitialState;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    // extraReducers: {
    //   // @ts-ignore
    //   [HYDRATE]: (state, action) => {
    //     return {
    //       ...state,
    //       ...action.payload.user,
    //     };
    //   },
    // },
  },
});

export const roomListActions = roomListSlice.actions;

export const selectRoomListState = (state: AppState) => state.roomList;

export default roomListSlice.reducer;
