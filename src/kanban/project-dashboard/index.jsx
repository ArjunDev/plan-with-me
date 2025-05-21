import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { allProjectsData } from '../input-context';

const ProjectDashBoard = () => {

  const {id: currentProjectId} = useParams();
  const { allProjects, setAllProjects } = useContext(allProjectsData);
  const [currentProject, setCurrentProject] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [percentageCompletion, setPercentageCompletion] = useState("");
  

  useEffect(()=>{
    const currentProjectData = allProjects[currentProjectId];
    // console.log(currentProjectData);

    const pending = currentProjectData?.elements?.filter(item=> item.color === 'red').length;
    const inProgress = currentProjectData?.elements?.filter(item=> item.color === 'orange').length;
    const completed = currentProjectData?.elements?.filter(item=> item.color === 'green').length;

    const total = currentProjectData?.elements?.length;

    const percentComplete = (total === 0 ? 0 : (completed / total) * 100).toFixed(1);
    
    setPercentageCompletion(percentComplete)
    setPendingTasks(pending);
    setInProgressTasks(inProgress);
    setCompletedTasks(completed);
    setCurrentProject(currentProjectData);

  },[currentProjectId, allProjects])


  return (
    <div 
      className='flex flex-col justify-start items-center bg-gray-50 shadow-lg h-max w-[20%] rounded-2xl gap-6 p-4 min-w-[250px] '>
      <div 
        className='mt-2 bg-gray-200 w-full flex justify-center items-center rounded-lg'>
          {currentProject?.projectName ? <span className='font-medium p-2'>{currentProject?.projectName}</span> : <span className='font-medium p-2'>You haven't created a project yet!</span>
          }
      </div>

      {/* circular percentage progress bar */}
      <div className="relative flex justify-center items-center w-36 h-36 rounded-full bg-gray-100">
        <span
          className="absolute top-0 left-0 w-full h-full rounded-full transition-[background] duration-500 ease-in-out"
          style={{
            background: `conic-gradient(#16a34a ${percentageCompletion * 3.6}deg, #e5e7eb ${percentageCompletion * 3.6}deg)`
          }}>
        </span>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 z-30 w-[85%] h-[85%] rounded-full'>
          <span 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-green-600">
            {percentageCompletion}%
          </span>
        </div>
      </div> 
        {/* Tasks breakdown */}
      <div className='w-full flex flex-col justify-center items-start'>
        <span className='font-bold mb-4'>Tasks</span>
        <div className='flex justify-center items-center flex-wrap gap-2 w-full'>
          <div 
            className='flex justify-center items-start flex-col bg-gray-200 p-2 gap-2 w-[48%] rounded-md'>
            <span className='text-xs'>TOTAL</span>
            <span className='font-medium ml-4'>{currentProject?.elements?.length}</span>
          </div>
          <div 
            className='flex justify-center items-start flex-col bg-gray-200 p-2 gap-2 w-[48%] rounded-md'>
            <span className='text-xs'>PENDING</span>
            <span className='font-medium ml-4'>{pendingTasks}</span>
          </div>
          <div 
            className='flex justify-center items-start flex-col bg-gray-200 p-2 gap-2 w-[48%] rounded-md'>
            <span className='text-xs'>IN PROGRESS</span>
            <span className='font-medium ml-4'>{inProgressTasks}</span>
          </div>
          <div 
            className='flex justify-center items-start flex-col bg-gray-200 p-2 gap-2 w-[48%] rounded-md'>
            <span className='text-xs'>COMPLETED</span>
            <span className='font-medium ml-4'>{completedTasks}</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProjectDashBoard