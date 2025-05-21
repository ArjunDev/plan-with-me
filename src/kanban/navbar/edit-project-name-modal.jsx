import React, { useContext, useEffect, useState } from 'react';
import { allProjectsData } from '../input-context';
import CloseIcon from '@mui/icons-material/Close';


const EditProjectNameModal = ({isEditModalVisible, setIsEditModalVisible, projectIdToEdit}) => {
  
  const { allProjects, setAllProjects } = useContext(allProjectsData);
  const [currentProject, setCurrentProject] = useState({})
  const [projectNameFromInput, setProjectNameFromInput] = useState("")

  useEffect(()=>{
    const currProject = allProjects[projectIdToEdit];
    setProjectNameFromInput(currProject.projectName);
    setCurrentProject(currProject);
  },[])

  const handleInputEl = (e) => {
    setProjectNameFromInput(e.target.value)
  }
  const handleCloseBtn = () =>{
    setIsEditModalVisible(false);
  }

  const handleSaveBtn = () => {

      // Trim removes spaces from both ends
      if (!projectNameFromInput.trim()) {
        alert("Project name cannot be empty.");
        return;
      }

    const updatedProject = {
      ...currentProject, projectName: projectNameFromInput
    };

    const updatedAllProjects = {
      ...allProjects, [projectIdToEdit]: updatedProject
     
    }
    setAllProjects(updatedAllProjects);

    localStorage.setItem('allProjects', JSON.stringify(updatedAllProjects));

    setProjectNameFromInput("");
    setIsEditModalVisible(false);
  };
  
  return (
    <>
      {isEditModalVisible && (
        <div 
          className='fixed inset-0 flex items-center justify-center z-50'
        >
          {/* Overlay */}
        <div 
          className='absolute inset-0 backdrop-blur-xs bg-black/25'
        >
        </div> 
          <div 
            className='relative flex flex-col w-[92%] sm:w-[50%] h-auto p-8 gap-4 bg-blue-50 shadow-lg rounded-2xl z-50'
          >
            <button 
              className='absolute right-4 top-2 text-lg cursor-pointer p-2 hover:text-red-500'
              onClick={handleCloseBtn}
            >{<CloseIcon/>}</button>
            <span className='mt-4 font-medium'>Edit Project Name</span>
            <div className='flex flex-col gap-4 border p-3 rounded-2xl'>
            <div className='flex gap-4 mt-4 justify-center items-center'>
              <span>Project Name:</span>
              <input 
                type="text" 
                onChange={handleInputEl}
                value={projectNameFromInput}
                className='bg-blue-50 rounded w-[60%] p-1 px-2 border-blue-400 border'
                placeholder='name of the project'
              />
            </div>
            <div className='flex gap-4 justify-center items-center'>
              <button 
                onClick={handleCloseBtn}
                className='bg-gray-300 px-4 p-1 rounded-2xl cursor-pointer shadow-md hover:bg-gray-400'>Close</button>
              <button 
                onClick={handleSaveBtn}
                className='bg-blue-400 px-4 p-1 rounded-2xl cursor-pointer shadow-md hover:bg-blue-500'>Save</button>
            </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EditProjectNameModal