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
    <div className='flex justify-between items-center w-full h-12 rounded px-8 gap-4 mt-3'>
      <div className='flex items-center gap-4'>
        <MenuBar />
        <span className='rounded font-bold p-1.5 px-3 bg-gray-50 text-blue-600'>PlanWithMe</span>
      </div>
      <CreateNewProject />
    </div>
  )
}

export default NavBar;