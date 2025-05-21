import React, { useContext, useState } from 'react';
import { allProjectsData } from './input-context';

const InputBar = ({ currentProject, setCurrentProject }) => {
  const { allProjects, setAllProjects } = useContext(allProjectsData);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState('Low');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSaveBtn = () => {
    if (!taskTitle || !taskDesc || !taskDueDate) {
      alert("Please enter all the fields!");
      return;
    }

    const newTask = {
      id: Date.now(),
      task: taskTitle,
      color: 'red',
      desc: taskDesc,
      priority: taskPriority,
      dueDate: taskDueDate,
      hideTaskDetails: false,
    };

    const updatedProject = {
      ...currentProject,
      elements: [...currentProject.elements, newTask],
    };

    const updatedAllProjects = {
      ...allProjects,
      [updatedProject.projectId]: updatedProject,
    };

    setCurrentProject(updatedProject);
    setAllProjects(updatedAllProjects);
    localStorage.setItem('allProjects', JSON.stringify(updatedAllProjects));

    setTaskTitle('');
    setTaskDesc('');
    setTaskDueDate('');
    setTaskPriority('Low');
    setIsModalVisible(false);
  };

  return (
    <div>
      <button
        className="rounded-2xl bg-blue-400 w-auto p-1.5 px-3 hover:bg-blue-500 font-medium shadow-lg"
        onClick={() => setIsModalVisible(true)}
      >
        Add New Task
      </button>

      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 backdrop-blur-sm bg-black/25" />
          <div className="relative flex flex-col w-[85%] sm:w-[50%] gap-4 bg-blue-50 shadow-lg p-8 rounded-2xl z-50">
            <input
              className="border shadow-md rounded p-2"
              type="text"
              placeholder="Title of the task"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <textarea
              className="border shadow-md rounded p-2 min-h-40"
              placeholder="Description"
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
            />
            <div>
              <label>Priority:</label>
              <select
                className="border rounded ml-2 cursor-pointer px-2"
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <label>
              Due Date:
              <input
                type="date"
                className="border p-1 rounded mb-4 cursor-pointer ml-2"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
              />
            </label>
            <div className="flex justify-center gap-6">
              <button
                className="bg-blue-500 p-2 rounded font-bold text-white hover:bg-blue-400 cursor-pointer"
                onClick={handleSaveBtn}
              >
                Save
              </button>
              <button
                className="bg-red-500 p-2 rounded font-bold text-white hover:bg-red-400 cursor-pointer"
                onClick={() => setIsModalVisible(false)}
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
