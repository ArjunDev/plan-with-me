import React, { useContext, useEffect, useState } from 'react';
import CreateNewProject from '../create-new-project';
import { allProjectsData } from '../input-context';
import { NavLink } from 'react-router-dom';

const MenuBar = () => {

  const { allProjects, setAllProjects } = useContext(allProjectsData);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  // State to control modal visibility
  const [allProjectsList, setAllProjectsList] = useState({})


  const handleMenuBtn = () =>{
    setIsModalVisible(true);
  }
  const handleCloseBtn = () =>{
    setIsModalVisible(false);
  }

  useEffect(()=>{
    //getting obl from localStorage
    const allProjectsFromLocal = JSON.parse(localStorage.getItem("allProjects")) || {};
    // converting obj to array
    const arrOfAllProj = Object.values(allProjectsFromLocal);
    setAllProjectsList(arrOfAllProj);
    // console.log(arrOfAllProj)
  },[allProjects])

  return (
    <>
    <button 
      className='cursor-pointer font-bold bg-blue-400 hover:bg-blue-500 px-3 p-1.5 shadow-lg rounded-2xl'
      onClick={handleMenuBtn}
    >Menu</button>
    
    {isModalVisible && (
      <div 
        className='fixed top-0 left-0 flex items-center justify-center z-50 h-full w-[30%]'
      >
        <div 
          className='relative flex flex-col p-8 gap-4 bg-gray-50 shadow-lg h-full w-full'
        >
          <button 
            className='absolute right-2 top-1 text-2xl cursor-pointer p-2'
            onClick={handleCloseBtn}
          >X</button>
          <div>
            <div className='mt-8 flex justify-between items-center '>
              <span className='font-bold'>All Projects</span>
              <CreateNewProject/>
            </div>
            <div className='flex flex-col gap-2 mt-8'>
              {allProjectsList && allProjectsList.map( project => (
                <NavLink 
                  key={project.projectId}
                  className='rounded list-none p-2 px-3 shadow-lg bg-gray-50 border hover:border hover:border-green-500'
                  to={project.projectId}
                >{project.projectName}</NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default MenuBar