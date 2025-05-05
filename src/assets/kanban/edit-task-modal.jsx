import React, { useEffect, useState } from 'react';

const EditTask = ({ task, onSave, onClose }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskPriority, setTaskPriority] = useState('low');
  const [taskDueDate, setTaskDueDate] = useState('');

  // Populate state with task data when editing
  useEffect(() => {
    if (task) {
      setTaskTitle(task.task);
      setTaskDesc(task.desc);
      setTaskPriority(task.priority);
      setTaskDueDate(task.dueDate);
    }
  }, [task]);

  // console.log(task)
  
  const handleDatePicker = (e) => {
    setTaskDueDate(e.target.value);
  };

  const handleSaveBtn = () => {
    if (taskTitle === '' || taskDesc === '' || taskDueDate === "") {
      alert('Please enter both Task title and Description.');
      return;
    }

    const updatedTask = {
      ...task,
      task: taskTitle,
      desc: taskDesc,
      priority: taskPriority,
      dueDate: taskDueDate,
    };

    onSave(updatedTask); // Pass the updated task to the parent
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 backdrop-blur-lg bg-black/10"></div>
      <div className="relative flex flex-col p-7 gap-2 bg-blue-50 shadow-md shadow-blue-300 rounded z-50 w-[80%] sm:w-[30%]">
        <input
          id="task-title"
          className="border shadow-md rounded p-2"
          type="text"
          placeholder="Title of the task"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <textarea
          id="task-desc"
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
            className="border rounded ml-2"
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
        <div className="flex justify-center items-center p-4 gap-4">
          <button
            id="save-btn"
            className="shadow-md shadow-blue-300 rounded bg-blue-500 min-w-fit p-2 hover:bg-blue-400 font-bold"
            onClick={handleSaveBtn}
          >Save</button>
          <button
            id="close-btn"
            className="shadow-md shadow-blue-300 rounded bg-red-500 min-w-fit p-2 hover:bg-red-400 font-bold"
            onClick={onClose}
          >Cancle</button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
