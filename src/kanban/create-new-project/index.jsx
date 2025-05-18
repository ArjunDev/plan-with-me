import React, { useState } from 'react'
import CreateNewProjectModal from './create-new-project-modal'

const CreateNewProject = () => {

  const [isModalVisible, setIsModalVisible] = useState(false); 
  // State to control modal visibility

  const handleCreateNewProjectBtn = () =>{
    setIsModalVisible(true);
  }

  return (
    <div
      className='fixed right-6'
    >
      <button
        onClick={handleCreateNewProjectBtn}
        className='bg-blue-400 px-3 p-1.5 rounded-2xl font-medium shadow-lg cursor-pointer'
      >Create New Project</button>
      <CreateNewProjectModal 
        isModalVisible={isModalVisible} 
        setIsModalVisible={setIsModalVisible} 
      />
    </div>
  )
}

export default CreateNewProject