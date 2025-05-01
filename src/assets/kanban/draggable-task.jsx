import React, { useContext } from "react";
import { ElementsData } from './input-context';


const DraggableTask = ({ element, handleDragStart, handleDeleteTaskBtn, handleEditTaskBtn }) => {

    // Global state item
    const { elements, setElements } = useContext(ElementsData);
    
    const hideTaskDetailsBtn = (taskId) =>{

      const updatedElements = elements.map((el) => (el.id === taskId) ? {...el, hideTaskDetails: !el.hideTaskDetails} : el); 
      // console.log(updatedElements)
      setElements(updatedElements); // Update state
      localStorage.setItem("elements", JSON.stringify(updatedElements));
      // Update localStorage
  }
  
  return (
    <div
      key={element.id}
      draggable
      onDragStart={(e) => handleDragStart(e, element)}
      className="flex flex-col p-4 gap-2 bg-blue-100 rounded-2xl hover:cursor-grab shadow-lg"
      style={{ borderBottom: `3px solid ${element.color}` }}
    >
      <div className="flex items-start justify-center relative">
        <div
          className="font-medium text-center"
        >{element.task}</div>
        <div 
          className="h-full p-2 items-center justify-center">
          <div 
            onClick={() => hideTaskDetailsBtn(element.id)}
            className="absolute right-0 top-0 cursor-pointer text-lg font-bold"
          >{`>`}</div>
        </div>
        
      </div>
      <div 
        className={ element.hideTaskDetails ? "hidden " : "flex flex-col gap-2"}
      >
      <div>
        <span className="font-medium text-base">Description: </span>
        <p className="text-xs ml-4">{element.desc}</p>
      </div>
      <div>
        <span className="font-medium mr-1.5 mb-1.5 text-base">Priority: 
        </span>
        <span className="text-sm">{element.priority}</span>
      </div>
      <div>
        <span className="font-medium mr-1.5 mb-1.5 text-base">Due Date: 
        </span>
        <span className="text-sm">{element.dueDate}</span>
      </div>
      <div className="flex gap-2 justify-center items-center mt-1">
        <button
          id={element.id}
          className="shadow-md shadow-red-300 rounded-2xl bg-red-500 w-auto p-1 px-4 hover:bg-red-400 font-medium hover:cursor-pointer"
          onClick={() => handleDeleteTaskBtn(element.id)}
        >Delete</button>
        <button
          id={element.id}
          className="shadow-md shadow-blue-300 rounded-2xl bg-blue-500 w-auto p-1 px-6 hover:bg-blue-400 font-medium hover:cursor-pointer"
          onClick={() => handleEditTaskBtn(element)}
        >Edit</button>
      </div>
      </div>
    </div>
  );
};

export default DraggableTask;
