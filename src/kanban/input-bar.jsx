import React, { useContext, useEffect, useState } from 'react';
import { ElementsData } from './input-context';

const InputBar = () => {
  const { elements, setElements } = useContext(ElementsData); 
  // global context state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState('Low');
  const [isModalVisible, setIsModalVisible] = useState(false); 
  // State to control modal visibility

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

  const handleDatePicker = (e) => {
    setTaskDueDate(e.target.value);
  };

  const handleSaveBtn = () => {

    if (taskTitle === "" || taskDesc === "" || taskDueDate === "") {
      alert("Please enter all the fields!");
      return
    }

    setElements((prevElements) => [
      ...prevElements,
      {
        // to generate uniqe number ex: 1746121300490
        id: Date.now(),
        task: taskTitle,
        color: 'red',
        desc: taskDesc,
        priority: taskPriority,
        dueDate: taskDueDate,
        hideTaskDetails: false,
      }]);
    setTaskTitle('');
    setTaskDesc('');
    setTaskPriority('Low');
    setIsModalVisible(false); // Hide the modal after saving
  };

  const handleCloseBtn = () => {
    setIsModalVisible(false); // Hide the modal
  };

  // console.log("Task Due Date: ", taskDueDate)
  // console.log("Task Priority: ", taskPriority)
  return (
    <div className=''>
      <button
        className="rounded bg-blue-600 w-auto p-2 hover:bg-blue-500 font-bold hover:cursor-pointer"
        onClick={handleAddNewTaskBtn}
      >Add New Task</button>
      {isModalVisible && (
        <div 
          className='fixed inset-0 flex items-center justify-center z-50'
        >
        <div 
          className='absolute inset-0 backdrop-blur-sm bg-black/25'>
        </div> {/* Overlay */}
          <div 
            className='relative flex flex-col w-[85%] h-auto sm:w-[50%] sm:h-auto sm:gap-8 p-8 gap-4 bg-blue-50 shadow-lg shadow-blue-500 rounded-2xl z-50'
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
                className='border rounded ml-2 cursor-pointer px-2'
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <label>Due Date: <input 
              type="date"
              value={taskDueDate}
              onChange={handleDatePicker}
              className="border p-1 rounded mb-4 cursor-pointer"
              />
            </label>
            <div className='flex justify-center items-center p-2 gap-6'>
              <button
                id='save-btn'
                className="shadow-md shadow-blue-300 rounded bg-blue-500 min-w-fit p-2 hover:bg-blue-400 font-bold"
                onClick={handleSaveBtn}
              >Save</button>
              <button
                id='close-btn'
                className="shadow-md shadow-blue-300 rounded bg-red-500 min-w-fit p-2 hover:bg-red-400 font-bold"
                onClick={handleCloseBtn}
              >Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputBar;
