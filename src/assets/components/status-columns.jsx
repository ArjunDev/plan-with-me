import React, { useContext, useEffect, useState } from 'react';
import { ElementsData } from './input-context';
import EditTask from '../edit-task';

function StatusColumns() {
  
  const { elements, setElements } = useContext(ElementsData);// Global state item
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Control edit mode
  const [editingTask, setEditingTask] = useState(null); // Store task being edited


  // Distribute elements into respective columns based on color
  useEffect(() => {
    setPendingTasks(elements.filter((el) => el.color === 'red'));
    setInProgressTasks(elements.filter((el) => el.color === 'orange'));
    setCompletedTasks(elements.filter((el) => el.color === 'green'));
  }, [elements]);

  const handleDragStart = (e, element) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(element));
    //console.log(element)
  };

  const handleDrop = (e, newColor) => {
    e.preventDefault();
    const draggedElement = JSON.parse(e.dataTransfer.getData('text/plain'));
    //console.log(draggedElement)
    setElements((prevElements) =>
      prevElements.map((el) =>
        el.id === draggedElement.id ? { ...el, color: newColor } : el
      )
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDeleteTaskBtn = (taskId) => {
    const updatedElements = elements.filter((el) => el.id !== taskId); // Filter out the task
    setElements(updatedElements); // Update state
    localStorage.setItem("elements", JSON.stringify(updatedElements)); 
    // Update localStorage
  };

  const handleEditTaskBtn = (task) => {
    //console.log(task)
    setEditingTask(task);
    setIsEditing(true);
  };

  const handleSaveTask = (updatedTask) => {
    setElements((prevElements) =>
      prevElements.map((el) => (el.id === updatedTask.id ? updatedTask : el))
    );
    setIsEditing(false);
    setEditingTask(null);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setEditingTask(null);
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-8 max-w-full">
      {/* Render the InputBar modal when editing */}
      {isEditing && (
        <EditTask
          task={editingTask}
          onSave={handleSaveTask}
          onClose={handleCloseEdit}
        />
      )}
      {/* Pending Column */}
      <div
        className="flex justify-start items-center flex-col min-h-screen w-full border border-dashed border-cyan-500 gap-1 p-2"
        id="pending-col"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'red')}
      >
        <span className="shadow-md shadow-red-300 p-2 mb-2 font-bold w-full flex justify-center items-center">
          Pending
        </span>
        {pendingTasks.map((element) => (
          <div
            key={element.id}
            draggable
            onDragStart={(e) => handleDragStart(e, element)}
            className="flex flex-col p-5 gap-2 bg-blue-100 rounded hover:cursor-grab"
            style={{ borderBottom: `3px solid ${element.color}`}}
          >
          <p className="p-2 font-bold text-center">Task: {element.task}</p> 
          <div>
            <span className='font-bold mr-1.5 mb-1.5 text-base'>Description:</span>
            <p className='text-xs'>{element.desc}</p>
          </div>
          <div>
            <span className='font-bold mr-1.5 mb-1.5 text-base'>Priority: </span>
            <span className='text-sm'>{element.priority}</span>
          </div>
          <div className='flex gap-2 justify-center items-center mt-1'>
          <button 
              id={element.id}
              className="shadow-md shadow-red-300 rounded bg-red-500 w-auto p-2 hover:bg-red-400 font-bold hover:cursor-pointer"
              onClick={() => handleDeleteTaskBtn(element.id)}>Delete</button>
            <button
              id={element.id}
              className="shadow-md shadow-blue-300 rounded bg-blue-500 w-auto p-2 hover:bg-blue-400 font-bold hover:cursor-pointer"
              onClick={()=>handleEditTaskBtn(element)}>Edit</button>
          </div>
          </div>
        ))}
      </div>

      {/* InProgress Column */}
      <div
        className="flex justify-start items-center flex-col min-h-screen w-full border border-dashed border-cyan-500 gap-1 p-2"
        id="inprogress-col"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'orange')}
      >
        <span className="shadow-md shadow-yellow-300 p-2 mb-2 font-bold w-full flex justify-center items-center">
          InProgress
        </span>
        {inProgressTasks.map((element) => (
          <div
            key={element.id}
            draggable
            onDragStart={(e) => handleDragStart(e, element)}
            className="flex flex-col p-7 gap-2 bg-blue-100 rounded hover:cursor-grab"
            style={{ borderBottom: `3px solid ${element.color}` }}
          >
          <p className="p-2 font-bold text-center">Task: {element.task}
          </p> 
          <div>
            <span className='font-bold mr-1.5 mb-1.5 text-base'>Description:</span>
            <p className='text-xs'>{element.desc}</p>
          </div>
          <div>
            <span className='font-bold mr-1.5 mb-1.5 text-base'>Priority:</span>
            <span className='text-sm'>{element.priority}</span>
          </div>
          <div className='flex gap-2 justify-center items-center mt-1'>
            <button 
              id={element.id}
              className="shadow-md shadow-red-300 rounded bg-red-500 w-auto p-2 hover:bg-red-400 font-bold hover:cursor-pointer"
              onClick={() => handleDeleteTaskBtn(element.id)}>Delete</button>
            <button
              id={element.id}
              className="shadow-md shadow-blue-300 rounded bg-blue-500 w-auto p-2 hover:bg-blue-400 font-bold hover:cursor-pointer"
              onClick={()=>handleEditTaskBtn(element)}>Edit</button>
          </div>
          </div>
        ))}
      </div>

      {/* Completed Column */}
      <div
        className="flex justify-start items-center flex-col min-h-screen w-full border border-dashed border-cyan-500 gap-1 p-2"
        id="completed-col"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'green')}
      >
        <span className="shadow-md shadow-green-300 p-2 mb-2 font-bold w-full flex justify-center items-center">
          Completed
        </span>
        {completedTasks.map((element) => (
          <div
            key={element.id}
            draggable
            onDragStart={(e) => handleDragStart(e, element)}
            className="flex flex-col p-7 gap-2 bg-blue-100 rounded hover:cursor-grab"
            style={{ borderBottom: `3px solid ${element.color}` }}
          >
          <p className="p-2 font-bold text-center">Task: {element.task}
          </p> 
          <div>
            <span className='font-bold mr-1.5 mb-1.5 text-base'>Description:</span>
            <p className='text-xs'>{element.desc}</p>
          </div>
          <div>
            <span className='font-bold mr-1.5 mb-1.5 text-base'>Priority:</span>
            <span className='text-sm'>{element.priority}</span>
          </div>
          <div className='flex gap-2 justify-center items-center mt-1'>
            <button 
              id={element.id}
              className="shadow-md shadow-red-300 rounded bg-red-500 w-auto p-2 hover:bg-red-400 font-bold hover:cursor-pointer"
              onClick={() => handleDeleteTaskBtn(element.id)}>Delete</button>
            <button
              id={element.id}
              className="shadow-md shadow-blue-300 rounded bg-blue-500 w-auto p-2 hover:bg-blue-400 font-bold hover:cursor-pointer"
              onClick={()=>handleEditTaskBtn(element)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatusColumns;
