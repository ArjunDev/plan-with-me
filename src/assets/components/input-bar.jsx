import React, { useContext, useState } from 'react';
import { ElementsData } from './input-context';

const InputBar = () => {
  const { elements, setElements } = useContext(ElementsData);
  //global context state
  const [inputText, setInputText] = useState('');
  const handleAddBtn = () => {
    setElements((prevElements) => [
      ...prevElements,
      { id: prevElements.length + 1, task: inputText, color: 'red' }
    ]);
    //console.log(inputText);
    setInputText('');
  };

  //console.log(elements);

  return (
    <div className='mt-3'>
      <input
        className="border shadow-md shadow-green-300 rounded-tl-lg rounded-bl-lg p-2"
        type="text"
        placeholder="Enter a task..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button
        className="border shadow-md shadow-green-300 rounded-tr-lg rounded-br-lg bg-green-500 w-16 p-2 hover:bg-green-400 font-bold"
        onClick={handleAddBtn}
      >
        Add
      </button>
    </div>
  );
};

export default InputBar;
