import React, { createContext, useContext, useState } from 'react';

export type GlobalContent = {
  roomMsg: any;
  registerInfo: any;
  setRoomMsg: (value: any) => void;
  setRegisterInfo: (value: any) => void;
};

export const GlobalContext = createContext<GlobalContent>({
  roomMsg: [],
  registerInfo: {},
  setRegisterInfo: () => {},
  setRoomMsg: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: any) => {
  const [roomMsg, setRoomMsg] = useState([]);
  const [registerInfo, setRegisterInfo] = useState({name: '', phoneNumber: '', password: ''});

  return (
    <GlobalContext.Provider
      value={{
        roomMsg,
        setRoomMsg,
        registerInfo,
        setRegisterInfo
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
