import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';
import { roomInfo } from '../../../utils/types';

// Type for our state
export interface roomListState {
  list: roomInfo[];
  activeList: number[];
  loading: boolean;
}

const roomListInitialState: roomInfo[] = [];

// Initial state
const initialState: roomListState = {
  list: roomListInitialState,
  activeList: [],
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

      let temp = [];
      for (let i = 0; i < action.payload.length; i++) {
        temp.push(0);
      }
      state.activeList = temp;
    },

    setActiveRoom(state, action) {
      const activeUser: Array<{ socketId: string; uid: string }> =
        action.payload;

      state.list.forEach((room, index) => {
        if (!room.roomInfo.isGroup) {
          if (
            activeUser.find(
              (user) => user.uid === room.roomInfo.users[0]._id
            ) &&
            activeUser.find((user) => user.uid === room.roomInfo.users[1]._id)
          )
            state.activeList[index] = 1;
        }
      });
    },

    setNewLastMsg(state, action) {
      const message = action.payload;
      const roomIndex = state.list.findIndex(
        (room) => room.roomInfo._id === message.roomId
      );

      state.list[roomIndex].roomInfo.lastMsg =
        message.msg !== ''
          ? message.msg
          : message.files[message.files.length - 1].name;
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
