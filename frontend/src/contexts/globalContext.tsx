import React, { createContext, useContext, useState } from 'react';

export type GlobalContent = {
  roomMsg: any;
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
