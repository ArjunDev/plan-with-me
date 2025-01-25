import React, { createContext, useState } from 'react';

// Create context
export const ElementsData = createContext();

export const InputContext = ({ children }) => {
 
  const [elements, setElements] = useState([]); 
  const [addToPending, setAddToPending] = useState("")

  return (
    <ElementsData.Provider 
     value={{elements, setElements, addToPending, setAddToPending}}
    >
      {children}
    </ElementsData.Provider>
  );
};
