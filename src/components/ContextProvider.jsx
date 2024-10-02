// ContextProvider.js
import React, { createContext } from 'react';

export const MyContext = createContext();

const ContextProvider = ({ children }) => {
  // Provide the necessary context values here
  const contextValue = { basename: '/example' };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

export default ContextProvider;
