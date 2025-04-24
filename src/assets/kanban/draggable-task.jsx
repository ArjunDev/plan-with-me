import React from "react";

const DraggableTask = ({ element, handleDragStart, handleDeleteTaskBtn, handleEditTaskBtn }) => {
  
  return (
    <div
      key={element.id}
      draggable
      onDragStart={(e) => handleDragStart(e, element)}
      className="flex flex-col p-4 gap-2 bg-blue-100 rounded hover:cursor-grab shadow-lg"
      style={{ borderBottom: `3px solid ${element.color}` }}
    >
      <p className="p-2 font-bold text-center">Task: {element.task}</p>
      <div>
        <span className="font-bold mr-1.5 mb-1.5 text-base">Description: </span>
        <p className="text-xs">{element.desc}</p>
      </div>
      <div>
        <span className="font-bold mr-1.5 mb-1.5 text-base">Priority: 
        </span>
        <span className="text-sm">{element.priority}</span>
      </div>
      <div>
        <span className="font-bold mr-1.5 mb-1.5 text-base">Due Date: 
        </span>
        <span className="text-sm">{element.dueDate}</span>
      </div>
      <div className="flex gap-2 justify-center items-center mt-1">
        <button
          id={element.id}
          className="shadow-md shadow-red-300 rounded bg-red-500 w-auto p-1 hover:bg-red-400 font-bold hover:cursor-pointer"
          onClick={() => handleDeleteTaskBtn(element.id)}
        >Delete</button>
        <button
          id={element.id}
          className="shadow-md shadow-blue-300 rounded bg-blue-500 w-auto p-1 hover:bg-blue-400 font-bold hover:cursor-pointer"
          onClick={() => handleEditTaskBtn(element)}
        >Edit</button>
      </div>
    </div>
  );
};

export default DraggableTask;
