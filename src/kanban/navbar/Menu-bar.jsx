import React, { useState } from 'react'

const MenuBar = () => {

  const [isModalVisible, setIsModalVisible] = useState(false); 
  // State to control modal visibility


  const handleMenuBtn = () =>{
    setIsModalVisible(true);
  }
  const handleCloseBtn = () =>{
    setIsModalVisible(false);
  }

  return (
    <>
    <button 
      className='cursor-pointer font-bold bg-blue-400 px-3 p-1.5 shadow-lg rounded-2xl'
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
            className='absolute right-4 top-2 font-medium text-2xl cursor-pointer text-red-500'
            onClick={handleCloseBtn}
          >X</button>
        </div>
      </div>
    )}
    </>
  )
}

export default MenuBar