import React from 'react'

const CreateNewProjectModal = ({isModalVisible, setIsModalVisible}) => {

  // const [isModalVisible, setIsModalVisible] = useState(false); 
  // // State to control modal visibility

  const handleCloseBtn = () =>{
    setIsModalVisible(false);
  }

  return (
    <>
      {isModalVisible && (
        <div 
          className='fixed inset-0 flex items-center justify-center z-50'
        >
        <div 
          className='absolute inset-0 backdrop-blur-xs bg-black/25'>
        </div> {/* Overlay */}
          <div 
            className='relative flex flex-col w-[50%] h-[50%] p-8 gap-4 bg-blue-50 shadow-lg rounded-2xl z-50'
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

export default CreateNewProjectModal