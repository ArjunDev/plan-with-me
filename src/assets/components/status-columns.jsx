import React, { useContext } from 'react'
import { useState } from "react";
import { ElementsData } from './input-context';

function StatusColumns() {
  const [draggedId, setDraggedId] = useState(null); 
  const [draggedItem, setDraggedItem] = useState(null); 

  // Track the ID of the dragged element
  const { elements, setElements} = useContext(ElementsData);
  // Manage draggable elements with their colors

  const handleDragStart = (e, element) => {
    console.log(element);
    setDraggedItem(e.target);
    setDraggedId(element.id); // Set the ID of the currently dragged element
  };

  const handleDrop = (e) => {
    e.preventDefault();
    //console.log(e);
    const dropZone = e.target;
    const dropZoneId = e.target.id; // Dynamically get the drop zone ID
  
    setElements((prevElements) =>
      prevElements.map((el) =>
        el.id === draggedId
          ? { ...el, color: getColorByDropZone(dropZoneId) }
          : el
      )
    );
    dropZone.appendChild(draggedItem);
    //console.log(dropZone);
   //console.log(draggedItem);
    //console.log(`Dropped element ${draggedId} at ${dropZoneId}`);
  };
  
  const getColorByDropZone = (dropZoneId) => {
    switch (dropZoneId) {
      case "inprogress-col":
        return "orange";
      case "completed-col":
        return "green";
      default:
        return "red";
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow dropping
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-8 max-w-full" >
      {/* Drop Zones */}
      <div
        className="flex justify-start items-center flex-col min-h-screen w-full sm:w-32 md:w-40 lg:w-48 border border-dashed border-cyan-500 gap-1 p-2"
        id="pending-col"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
      <span className="shadow-md shadow-red-300 p-2 mb-2 font-bold">Pending</span>
      {/* Draggable Elements */}
      {elements.map((element) => (
        <div
          key={element.id}
          className="text-center cursor-gra p-2 border min-w-full"
          style={{ boxShadow: `2px 2px 4px ${element.color}` }} 
          // Individual shadow color
          draggable
          onDragStart={(e) => handleDragStart(e, element)}
        >
        {element.task}
        </div>))}
      </div>
      <div
        className="flex justify-start items-center flex-col min-h-screen w-full sm:w-32 md:w-40 lg:w-48 border border-dashed border-cyan-500 gap-1 p-2"
        id="inprogress-col"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
      <span className="shadow-md shadow-yellow-300 p-2 mb-2 font-bold">InProgress</span>
      </div>
      <div
        className="flex justify-start items-center flex-col min-h-screen w-full sm:w-32 md:w-40 lg:w-48 border border-dashed border-cyan-500 gap-1 p-2"
        id="completed-col"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
      <span className="shadow-md shadow-green-300 p-2 mb-2 font-bold">Completed</span>
      </div>
    </div>
  );
}

export default StatusColumns;
