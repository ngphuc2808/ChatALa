import ChatList from './ChatList';
import * as S from './SideBar.styled';
import TopNav from './TopNav';
import { useState, useEffect } from 'react';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../../utils/types';
import { Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { selectRoomListState } from '../../../features/redux/slices/roomListSlice';

interface ISideBar {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

const SideBar = ({ socket }: ISideBar) => {
  const [roomSelected, setRoomSelected] = useState(-1);
  const roomList = useSelector(selectRoomListState);

  useEffect(() => {
    if(roomSelected !== -2){
      //@ts-ignore
      socket && socket.emit('roomSelected', roomList.list[roomSelected].roomInfo._id)
    }
  }, [roomSelected])

  return (
    <S.SideBarContainer>
      <TopNav setRoomSelected={setRoomSelected} />
      <ChatList roomSelected={roomSelected} setRoomSelected={setRoomSelected} />
    </S.SideBarContainer>
  );
};

export default SideBar;
