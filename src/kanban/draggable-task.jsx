import React, { useContext } from "react";
import { allProjectsData } from './input-context';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';

const DraggableTask = ({ element, handleDragStart, handleDeleteTaskBtn, handleEditTaskBtn, currentProjectId }) => {

    // Global state item
    const { allProjects, setAllProjects } = useContext(allProjectsData);
    
    const hideTaskDetailsBtn = (taskId) => {
      const updatedProjects = { ...allProjects };
      const currentProject = updatedProjects[currentProjectId];
    
      if (!currentProject) return; // Safety check
    
      const updatedElements = currentProject.elements.map((task) =>
        task.id === taskId ? { ...task, hideTaskDetails: !task.hideTaskDetails } : task
      );
    
      updatedProjects[currentProjectId] = {
        ...currentProject,
        elements: updatedElements,
      };
    
      setAllProjects(updatedProjects);
      localStorage.setItem("allProjects", JSON.stringify(updatedProjects));
    };
    
  return (
    <div
      key={element.id}
      draggable
      onDragStart={(e) => handleDragStart(e, element)}
      className="flex flex-col p-4 gap-2 bg-gray-50 rounded-2xl hover:cursor-grab shadow-lg"
      style={{ borderBottom: `3px solid ${element.color}` }}
    >
      <div className="flex justify-between items-start w-full">
        <div className="font-medium text-left">{element.task}</div>
        <div 
          className="h-full flex items-start justify-end">
          <div 
            onClick={() => hideTaskDetailsBtn(element.id)}
            className="cursor-pointer w-6 h-6"
          >
            {element.hideTaskDetails ? (
              <KeyboardArrowRightIcon className="text-lg" />
            ) : (
              <KeyboardArrowDownIcon className="text-lg font-bold" />
            )}
          </div>
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
          className="text-red-500 w-auto p-1 px-2 hover:text-black font-medium hover:cursor-pointer rounded shadow"
          onClick={() => handleDeleteTaskBtn(element.id)}
        >{<DeleteIcon/>}</button>
        <button
          id={element.id}
          className="text-blue-500 w-auto p-1 px-2 hover:text-black font-medium hover:cursor-pointer rounded shadow"
          onClick={() => handleEditTaskBtn(element)}
        >{<EditIcon/>}</button>
      </div>
      </div>
    </div>
  );
};

export default DraggableTask;
