import React, { createContext, useContext, useState } from 'react';
import { messageType } from '../utils/types';

export type GlobalContent = {
  roomMsg: Array<messageType>;
  setRoomMsg: (value: any) => void;
};

export const GlobalContext = createContext<GlobalContent>({
  roomMsg: [],
  setRoomMsg: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: any) => {
  const [roomMsg, setRoomMsg] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        roomMsg,
        setRoomMsg,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
