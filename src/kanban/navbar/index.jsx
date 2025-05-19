import React, { useContext, useEffect } from 'react'
import MenuBar from './Menu-bar';
import CreateNewProject from '../create-new-project/index.jsx';
import { allProjectsData } from '../input-context.jsx';
const NavBar = () => {

  const { allProjects, setAllProjects } = useContext(allProjectsData);

  useEffect(()=>{
    //get items from localstorage if exists else make it as empty obj {}
     const allProjectsFromLocal =
     JSON.parse(localStorage.getItem("allProjects")) || {};
 
    //set items to localstorage
    localStorage.setItem("allProjects", JSON.stringify(allProjectsFromLocal));

    // console.log(allProjectsFromLocal)
  
    setAllProjects(allProjectsFromLocal)
  },[])

  return (
    <div className='flex justify-between items-center w-full h-12 rounded px-8 py-12 gap-4 bg-gray-200'>
      <div className='flex items-center gap-4'>
        <MenuBar />
        <span 
          className='ml-4 font-bold text-lg text-blue-600  underline'>PlanWithMe</span>
      </div>
      <CreateNewProject />
    </div>
  )
}

export default NavBar;