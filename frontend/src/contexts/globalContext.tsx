import React, { createContext, useContext, useState } from 'react';

export type GlobalContent = {
  test: boolean;
  setTest: (value: boolean) => void;
};

export const GlobalContext = createContext<GlobalContent>({
  test: false,
  setTest: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: any) => {
  const [test, setTest] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        test,
        setTest,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
