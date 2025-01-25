import React, { createContext, useState } from 'react';

// Create context
export const ElementsData = createContext();

export const InputContext = ({ children }) => {
 
  const [elements, setElements] = useState([]); 

  //console.log(elements)

  return (
    <ElementsData.Provider 
     value={{elements, setElements}}
    >
      {children}
    </ElementsData.Provider>
  );
};
