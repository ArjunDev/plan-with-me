import React, { useContext } from 'react';
import { useState } from "react";
import { ElementsData } from './input-context';

function StatusColumns() {
  const [draggedId, setDraggedId] = useState(null); 
  const [draggedItem, setDraggedItem] = useState(null); 
  // Track the ID of the dragged element
  const { elements, setElements } = useContext(ElementsData);
  // Manage draggable elements with their colors

  //console.log(elements);

  const handleDragStart = (e, element) => {
    console.log(element);
    setDraggedItem(e.target);
    setDraggedId(element.id); // Set the ID of the currently dragged element
  };

  const handleDrop = (e) => {
    e.preventDefault();
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

  const handleInputChange = (id, field, value) => {
    setElements((prevElements) =>
      prevElements.map((el) =>
        el.id === id ? { ...el, [field]: value } : el
      )
    );
  };

  return (
    <>
      <div className="flex justify-center items-center gap-4 mt-8 max-w-full">
        {/* Drop Zones */}
        <div
          className="flex justify-start items-center flex-col min-h-screen w-full border border-dashed border-cyan-500 gap-1 p-2"
          id="pending-col"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <span className="shadow-md shadow-red-300 p-2 mb-2 font-bold w-full flex justify-center items-center">Pending</span>
          {/* Draggable Elements */}
          {elements.map((element) => (
            <div
              key={element.id}
              draggable
              onDragStart={(e) => handleDragStart(e, element)}
            >
              <div
                className="flex flex-col p-7 gap-2 bg-blue-100 rounded hover:cursor-grab"
                style={{ borderBottom: `3px solid ${element.color}` }}
              >
                <input
                  id="task-title"
                  className="border shadow-md rounded p-2"
                  type="text"
                  value={element.task}
                  onChange={(e) => handleInputChange(element.id, "task", e.target.value)}
                />
                <textarea
                  id="task-desc"
                  className="border shadow-m rounded p-2 min-h-40"
                  type="text"
                  value={element.desc}
                  onChange={(e) => handleInputChange(element.id, "desc", e.target.value)}
                />
                <div>
                  <label htmlFor="task-priority">Priority:</label>
                  <select
                    name="task-priority"
                    id="task-priority"
                    value={element.priority}
                    onChange={(e) => handleInputChange(element.id, "priority", e.target.value)}
                    className="bg-blue-50 rounded ml-2"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="flex justify-start items-center flex-col min-h-screen w-full border border-dashed border-cyan-500 gap-1 p-2"
          id="inprogress-col"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <span className="shadow-md shadow-yellow-300 p-2 mb-2 font-bold w-full flex justify-center items-center">InProgress</span>
        </div>

        <div
          className="flex justify-start items-center flex-col min-h-screen w-full border border-dashed border-cyan-500 gap-1 p-2"
          id="completed-col"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <span className="shadow-md shadow-green-300 p-2 mb-2 font-bold w-full flex justify-center items-center">Completed</span>
        </div>
      </div>
    </>
  );
}

export default StatusColumns;
