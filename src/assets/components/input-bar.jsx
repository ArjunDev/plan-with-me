import React, { useContext, useEffect, useState } from 'react';
import { ElementsData } from './input-context';

const InputBar = () => {
  const { elements, setElements } = useContext(ElementsData); // global context state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskPriority, setTaskPriority] = useState('Low');
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

  const handleAddNewTaskBtn = () => {
    setIsModalVisible(true); // Show the modal
  };

  // Load elements from localStorage on component mount
  useEffect(() => {
    const storedElements = JSON.parse(localStorage.getItem('elements'));
    //console.log(storedElements); // Check if it's null or an empty array on refresh
    if (storedElements && Array.isArray(storedElements)) {
      setElements(storedElements);
    } else {
      // If no elements are found, set an empty array
      setElements([]);
    }
  }, [setElements]);

  // Save elements to localStorage whenever they change
  useEffect(() => {
    if (elements.length > 0) {
      localStorage.setItem('elements', JSON.stringify(elements));
    }
  }, [elements]);


  const handleSaveBtn = () => {

    if (taskTitle === "" || taskDesc === "") {
      alert("Please enter both Task title and Description.");
      return
    }

    setElements((prevElements) => [
      ...prevElements,
      {
        id: prevElements.length + 1,
        task: taskTitle,
        color: 'red',
        desc: taskDesc,
        priority: taskPriority,
      }]);
    setTaskTitle('');
    setTaskDesc('');
    setTaskPriority('');
    setIsModalVisible(false); // Hide the modal after saving
  };

  const handleCloseBtn = () => {
    setIsModalVisible(false); // Hide the modal
  };

  return (
    <div className='mt-3'>
      <button
        className="shadow-md shadow-blue-300 rounded bg-blue-500 w-auto p-2 hover:bg-blue-400 font-bold hover:cursor-pointer"
        onClick={handleAddNewTaskBtn}
      >
        Add New Task
      </button>
      {isModalVisible && (
        <div 
          className='fixed inset-0 flex items-center justify-center z-50'
        >
          <div className='absolute inset-0 backdrop-blur-lg bg-black/30'>
          </div> {/* Overlay */}
          <div 
            className='relative flex flex-col p-7 gap-2 bg-blue-50 shadow-md shadow-blue-300 rounded z-50'
          >
            <input
              id='task-title'
              className="border shadow-md rounded p-2"
              type="text"
              placeholder="Title of the task"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <textarea
              id='task-desc'
              className="border shadow-md rounded p-2 min-h-40"
              placeholder="Description"
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
            />
            <div>
              <label htmlFor="task-priority">Priority:</label>
              <select
                name="task-priority"
                id="task-priority"
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value)}
                className='bg-blue-100 rounded ml-2'
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className='flex justify-center items-center p-4 gap-4'>
              <button
                id='save-btn'
                className="shadow-md shadow-blue-300 rounded bg-blue-500 min-w-fit p-2 hover:bg-blue-400 font-bold"
                onClick={handleSaveBtn}
              >
                Save
              </button>
              <button
                id='close-btn'
                className="shadow-md shadow-blue-300 rounded bg-red-500 min-w-fit p-2 hover:bg-red-400 font-bold"
                onClick={handleCloseBtn}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputBar;
