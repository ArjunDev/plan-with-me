import React, { useContext, useEffect, useState } from 'react';
import DraggableTask from './draggable-task';
import { ElementsData } from './input-context';
import EditTask from './edit-task-modal';
import DeleteTask from './delete-task-modal';

//import { FaTrash, FaPenSquare } from 'react-icons/fa';

function StatusColumns() {
  
  const { elements, setElements } = useContext(ElementsData);// Global state item
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false); // Control delete mode
  const [deletingTask, setDeletingTask] = useState(null); // Store task 
  const [isEditing, setIsEditing] = useState(false); // Control edit mode
  const [editingTask, setEditingTask] = useState(null); // Store task being edited


  // Distribute elements into respective columns based on color and sorting based on priority 
  useEffect(() => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  
    const sortByPriority = (tasks) => 
      [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  
    setPendingTasks(sortByPriority(elements.filter((el) => el.color.toLowerCase() === 'red')));
    setInProgressTasks(sortByPriority(elements.filter((el) => el.color.toLowerCase() === 'orange')));
    setCompletedTasks(sortByPriority(elements.filter((el) => el.color.toLowerCase() === 'green')));
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

  const handleDeleteTaskBtn = (taskId) => {
    setDeletingTask(taskId);  // Set the task ID to be deleted
    setIsDeleting(true);      // Show the Delete modal
  };
  
  const handlePreceedDelete = (taskId) => {
    const updatedElements = elements.filter((el) => el.id !== taskId); // Filter out the task by ID
    setElements(updatedElements); // Update state
    localStorage.setItem("elements", JSON.stringify(updatedElements));
    // Update localStorage
    setIsDeleting(false); // Close the modal after deletion
  };
  
  const handleCancleDelete = () => {
    setIsDeleting(false); // Close the modal without doing anything
    setDeletingTask(null); // Clear the task ID
  };

  return (
    <div className="flex justify-between items-start sm:flex-1 gap-4 mt-8 w-full">
      {/* Render the EditTask modal when editing */}
      {isEditing && (
        <EditTask
          task={editingTask}
          onSave={handleSaveTask}
          onClose={handleCloseEdit}
        />
      )}
      {/* Render the DeleteTask modal when deleting */}
      {isDeleting && (
        <DeleteTask
          taskId={deletingTask}
          onYes={handlePreceedDelete}
          onNo={handleCancleDelete}
        />
      )}
      {/* Pending Column */}
      <div
        className="flex flex-col min-h-screen flex-1 border border-dashed border-cyan-500 gap-4 p-2"
        id="pending-col"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'red')}
      >
        <div>
        <span className="shadow-md bg-blue-100 shadow-red-400 p-2 mb-2 font-bold rounded w-full flex justify-center items-center">Pending
        <span 
          className='text-sm font-light ml-1'>- {pendingTasks.length} {pendingTasks.length > 1 ? "Items" : "Item"}
        </span></span>
        </div>
        {pendingTasks.map((element) => (
          <DraggableTask
            key={element.id}
            element={element}
            handleDragStart={handleDragStart}
            handleDeleteTaskBtn={handleDeleteTaskBtn}
            handleEditTaskBtn={handleEditTaskBtn}
          />
        ))}
      </div>

      {/* InProgress Column */}
      <div
        className="flex flex-col min-h-screen flex-1 border border-dashed border-cyan-500 gap-4 p-2"
        id="inprogress-col"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'orange')}
      >
        <div>
        <span className="shadow-md bg-blue-100 shadow-yellow-500 p-2 mb-2 font-bold w-full rounded flex justify-center items-center">InProgress
        <span 
          className='text-sm font-light ml-1'>- {inProgressTasks.length} {inProgressTasks.length > 1 ? "Items" : "Item"}
        </span></span>
        </div>
        {inProgressTasks.map((element) => (
          <DraggableTask
            key={element.id}
            element={element}
            handleDragStart={handleDragStart}
            handleDeleteTaskBtn={handleDeleteTaskBtn}
            handleEditTaskBtn={handleEditTaskBtn}
          />
        ))}
      </div>

      {/* Completed Column */}
      <div
        className="flex flex-col min-h-screen flex-1 border border-dashed border-cyan-500 gap-4 p-2"
        id="completed-col"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'green')}
      >
        <div>
        <span className="shadow-md bg-blue-100 shadow-green-500 p-2 mb-2 font-bold w-full rounded flex justify-center items-center">Completed
        <span 
          className='text-sm font-light ml-1'>- {completedTasks.length} {completedTasks.length > 1 ? "Items" : "Item"}
        </span></span>
        </div>
        {completedTasks.map((element) => (
          <DraggableTask
            key={element.id}
            element={element}
            handleDragStart={handleDragStart}
            handleDeleteTaskBtn={handleDeleteTaskBtn}
            handleEditTaskBtn={handleEditTaskBtn}
          />
        ))}
      </div>
    </div>
  );
}

export default StatusColumns;
