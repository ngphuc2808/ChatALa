import React, { createContext, useContext, useState } from 'react';
import { messageType, UserRegister, roomInfo } from '../utils/types';

export type GlobalContent = {
  roomChoosen: boolean;
  setRoomChoosen: (value: boolean) => void;
  roomList: roomInfo[];
  setRoomList: (value: roomInfo[]) => void;
  roomMsg: messageType[];
  setRoomMsg: (value: messageType[]) => void;
  roomInfo: roomInfo;
  setRoomInfo: (value: roomInfo) => void;
  registerInfo: UserRegister;
  setRegisterInfo: (value: UserRegister) => void;
};

export const GlobalContext = createContext<GlobalContent>({
  roomChoosen: false,
  setRoomChoosen: () => {},
  roomList: [],
  setRoomList: () => {},
  roomMsg: [],
  setRoomMsg: () => {},
  roomInfo: {
    roomName: '',
    roomAvatar: '',
    roomInfo: {
      createdAt: '',
      groupName: '',
      isGroup: false,
      lastMsg: '',
      updatedAt: '',
      users: [],
      __v: 0,
      _id: '',
    },
  },
  setRoomInfo: () => {},
  registerInfo: { name: '', phone: '' },
  setRegisterInfo: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: any) => {
  const [roomMsg, setRoomMsg] = useState<messageType[]>([]);
  const [roomInfo, setRoomInfo] = useState<roomInfo>({
    roomName: '-1',
    roomAvatar: '',
    roomInfo: {
      createdAt: '',
      groupName: '',
      isGroup: false,
      lastMsg: '',
      updatedAt: '',
      users: [],
      __v: 0,
      _id: '',
    },
  });
  const [registerInfo, setRegisterInfo] = useState<UserRegister>({
    name: '',
    phone: '',
  });
  const [roomList, setRoomList] = useState<roomInfo[]>([]);
  const [roomChoosen, setRoomChoosen] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        roomChoosen,
        setRoomChoosen,
        roomList,
        setRoomList,
        roomMsg,
        setRoomMsg,
        roomInfo,
        setRoomInfo,
        registerInfo,
        setRegisterInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
