import React, { useContext, useState } from 'react';
import { allProjectsData } from '../input-context';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';


const CreateNewProjectModal = ({isModalVisible, setIsModalVisible}) => {
  
  const { allProjects, setAllProjects } = useContext(allProjectsData);
  const [projName, setProjName] = useState("")
  const navigate = useNavigate()

  const handleInputEl = (e) => {
    setProjName(e.target.value)
  }
  const handleCloseBtn = () =>{
    setIsModalVisible(false);
  }

  const handleSaveBtn = () => {

      // Trim removes spaces from both ends
      if (!projName.trim()) {
        alert("Project name cannot be empty.");
        return;
      }

    const newProject = {
      projectId: Date.now().toString(), 
      projectName: projName,
      elements: [],
    };
    //get items from localstorage if exists else make it as empty obj {}
    const allProjectsFromLocal =
      JSON.parse(localStorage.getItem("allProjects")) || {};
  
    allProjectsFromLocal[newProject.projectId] = newProject;
    //set items to localstorage
    localStorage.setItem("allProjects", JSON.stringify(allProjectsFromLocal));
  

    setAllProjects(allProjectsFromLocal);
    setProjName("");
    setIsModalVisible(false);
    navigate(`/${newProject.projectId}`)
  };
  
  return (
    <>
      {isModalVisible && (
        <div 
          className='fixed inset-0 flex items-center justify-center z-50'
        >
          {/* Overlay */}
        <div 
          className='absolute inset-0 backdrop-blur-xs bg-black/25'
        >
        </div> 
          <div 
            className='relative flex flex-col w-[80%] sm:w-[50%] h-auto p-8 gap-4 bg-blue-50 shadow-lg rounded-2xl z-50'
          >
            <button 
              className='absolute right-4 top-2 text-lg cursor-pointer p-2'
              onClick={handleCloseBtn}
            >{<CloseIcon/>}</button>
            <span className='mt-4 font-medium'>New Project</span>
            <div className='flex flex-col gap-4 border p-3 rounded-2xl'>
            <div className='flex gap-4 mt-4 justify-center items-center'>
              <span>Project Name:</span>
              <input 
                type="text" 
                onChange={handleInputEl}
                value={projName}
                className='bg-gray-200 rounded w-[60%] p-1 px-2 border-blue-400 border'
                placeholder='name of the project'
              />
            </div>
            <div className='flex gap-4 justify-center items-center'>
              <button 
                onClick={handleCloseBtn}
                className='bg-gray-300 px-4 p-1 rounded-2xl cursor-pointer shadow-md'>Close</button>
              <button 
                onClick={handleSaveBtn}
                className='bg-blue-400 px-4 p-1 rounded-2xl cursor-pointer shadow-md'>Save</button>
            </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreateNewProjectModal