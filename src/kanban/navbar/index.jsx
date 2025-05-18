import React from 'react'
import MenuBar from './Menu-bar';
import CreateNewProject from '../create-new-project/index.jsx';

const NavBar = () => {


  return (
    <div 
      className='flex justify-start items-center w-full h-12 rounded px-8 gap-4 mt-3'>
    <MenuBar/>
    <span className='rounded font-bold p-1.5 px-3 bg-gray-50 text-blue-600'>PlanWithMe</span>
    <CreateNewProject/>
  </div>
  )
}

export default NavBar;