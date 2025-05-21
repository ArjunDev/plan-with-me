import React, { useContext, useEffect, useState } from 'react';
import DraggableTask from './draggable-task';
import { allProjectsData } from './input-context';
import EditTask from './edit-task-modal';
import DeleteTask from './delete-task-modal';
import InputBar from './input-bar';
import { useParams } from 'react-router-dom';

function StatusBoard() {
  const { allProjects, setAllProjects } = useContext(allProjectsData);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingTask, setDeletingTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const { id: currentProjectId } = useParams();

  //To get local items when url params changes
  useEffect(() => {
    // console.log(currentProjectId)
    const allProjectsFromLocal = JSON.parse(localStorage.getItem("allProjects")) || {};

    setAllProjects(allProjectsFromLocal);
  }, [currentProjectId]);

  useEffect(() => {

    if (allProjects) {
      const currProj = allProjects[currentProjectId] || {};

      const tasks = currProj.elements || [];
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };

      const sortByPriority = (tasks) =>
        [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

      setPendingTasks(sortByPriority(tasks?.filter(el => el.color === 'red')));
      setInProgressTasks(sortByPriority(tasks?.filter(el => el.color === 'orange')));
      setCompletedTasks(sortByPriority(tasks?.filter(el => el.color === 'green')));

      setCurrentProject(currProj);
      // console.log(tasks)
      // console.log("All project",allProjects)
      // console.log("currentProj",currProj)
    }

  }, [allProjects, currentProjectId]);

  const handleDragStart = (e, element) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(element));
  };

  const handleDrop = (e, newColor) => {
    e.preventDefault();
    const draggedElement = JSON.parse(e.dataTransfer.getData('text/plain'));

    const updatedElements = currentProject.elements.map((task) =>
      task.id === draggedElement.id ? { ...task, color: newColor } : task
    );

    const updatedProject = { ...currentProject, elements: updatedElements };
    const updatedAllProjects = {
      ...allProjects,
      [updatedProject.projectId]: updatedProject
    };

    setCurrentProject(updatedProject);
    setAllProjects(updatedAllProjects);

    localStorage.setItem('allProjects', JSON.stringify(updatedAllProjects));
  };

  const handleEditTaskBtn = (task) => {
    setEditingTask(task);
    setIsEditing(true);
  };

  const handleSaveTask = (updatedTask) => {
    const updatedElements = currentProject.elements.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
  
    const updatedProject = { ...currentProject, elements: updatedElements };
    const updatedAllProjects = {
      ...allProjects,
      [currentProjectId]: updatedProject  // ✅ use currentProjectId here
    };
  
    setCurrentProject(updatedProject);
    setAllProjects(updatedAllProjects);
    localStorage.setItem('allProjects', JSON.stringify(updatedAllProjects));
  
    setIsEditing(false);
    setEditingTask(null);
  };
  
  const handleDeleteTaskBtn = (taskId) => {
    setDeletingTask(taskId);
    setIsDeleting(true);
  };

  const handlePreceedDelete = (taskId) => {
    const updatedElements = currentProject.elements.filter((el) => el.id !== taskId);
  
    const updatedProject = { ...currentProject, elements: updatedElements };
    const updatedAllProjects = {
      ...allProjects,
      [currentProjectId]: updatedProject  //use currentProjectId here
    };
  
    setCurrentProject(updatedProject);
    setAllProjects(updatedAllProjects);
    localStorage.setItem('allProjects', JSON.stringify(updatedAllProjects));
  
    setIsDeleting(false);
    setDeletingTask(null);
  };
  
  // console.log(currentProject)
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-[80%] rounded-2xl bg-gray-50 min-h-full shadow-lg overflow-x-scroll min-w-[700px] pb-8">
      {isEditing && (
        <EditTask
          task={editingTask}
          onSave={handleSaveTask}
          onClose={() => setIsEditing(false)}
        />
      )}
      {isDeleting && (
        <DeleteTask
          taskId={deletingTask}
          onYes={handlePreceedDelete}
          onNo={() => setIsDeleting(false)}
        />
      )}

      {/* kanabn board header */}
      <div className="flex justify-between items-center w-full px-8 mt-4 p-2">
        {currentProject?.projectName ? <span className="font-medium">
          {currentProject?.projectName}
        </span> : <span className='font-medium'>You haven't created a project yet!</span>}

        {/* show add-task-btn only if project exist */}
        {currentProject?.projectName &&
        <InputBar 
          currentProject={currentProject} 
          setCurrentProject={setCurrentProject} 
        />
        }
      </div>
        {/* All 3 columns */}
      <div 
        className="flex justify-between items-start gap-4 w-[95%]">
        {[
          { title: 'Pending', tasks: pendingTasks, color: 'red' },
          { title: 'InProgress', tasks: inProgressTasks, color: 'orange' },
          { title: 'Completed', tasks: completedTasks, color: 'green' },
        ].map(({ title, tasks, color }) => (
          <div
            key={color}
            className="flex flex-col min-h-screen flex-1 border border-dashed border-cyan-500 gap-4 p-2 rounded-2xl bg-gray-100"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, color)}
          >
            <div>
              <span className="shadow-md bg-gray-200 p-2 mb-2 font-bold rounded w-full flex justify-center items-center">
                {title}
                <span className="text-sm font-light ml-1">- {tasks.length} {tasks.length > 1 ? "Items" : "Item"}</span>
              </span>
            </div>
            {tasks.map((element) => (
              <DraggableTask
                key={element.id}
                element={element}
                handleDragStart={handleDragStart}
                handleDeleteTaskBtn={handleDeleteTaskBtn}
                handleEditTaskBtn={handleEditTaskBtn}
                currentProjectId={currentProjectId}
              />
            ))}
            {tasks.length === 0 && (
              <div className="text-center text-gray-400 italic">No {title.toLowerCase()} tasks</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatusBoard;
