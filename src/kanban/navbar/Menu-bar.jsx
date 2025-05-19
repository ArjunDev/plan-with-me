import React, { useContext, useEffect, useState } from 'react';
import CreateNewProject from '../create-new-project';
import { allProjectsData } from '../input-context';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const MenuBar = () => {
  const { allProjects, setAllProjects } = useContext(allProjectsData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allProjectsList, setAllProjectsList] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    const allProjectsFromLocal = JSON.parse(localStorage.getItem("allProjects")) || {};
    const arrOfAllProj = Object.values(allProjectsFromLocal);
    setAllProjectsList(arrOfAllProj);
  }, [allProjects]);

  const handleMenuBtn = () => {
    setIsModalVisible(true);
  };

  const handleCloseBtn = () => {
    setIsModalVisible(false);
  };

  const handleDeleteClick = (projectId) => {
    setProjectToDelete(projectId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = (projectId) => {
    const allProjectsFromLocal = JSON.parse(localStorage.getItem("allProjects")) || {};
    delete allProjectsFromLocal[projectId];
    localStorage.setItem("allProjects", JSON.stringify(allProjectsFromLocal));
    setAllProjects(allProjectsFromLocal);
    setProjectToDelete(null);
  };

  const handleEditProjectBtn = (projectId) => {
    // Placeholder
  };

  return (
    <>
      <button 
        className='cursor-pointer font-bold text-lg text-blue-600 hover:text-blue-500 p-1 px-2 shadow rounded-lg'
        onClick={handleMenuBtn}
      >
        <MenuIcon />
      </button>

      {isModalVisible && (
        <div className='fixed top-0 left-0 flex items-center justify-center z-50 h-full w-[30%]'>
          <div className='relative flex flex-col p-8 gap-4 bg-gray-50 shadow-lg h-full w-full'>
            <button 
              className='absolute right-2 top-1 font-bold text-2xl cursor-pointer p-2'
              onClick={handleCloseBtn}
            >
              <CloseIcon className='hover:text-red-500'/>
            </button>
            <div>
              <div className='mt-8 flex justify-between items-center'>
                <span className='font-bold'>All Projects</span>
                <CreateNewProject />
              </div>
              <div className='flex flex-col gap-2 mt-8'>
                {allProjectsList.map(project => (
                  <div
                    key={project.projectId}
                    className='border flex justify-between items-center rounded-md hover:border hover:border-blue-500 bg-gray-50 shadow-lg hover:shadow-blue-500 hover:shadow-sm'
                  >
                    <NavLink 
                      className='rounded list-none p-2 px-3 text-sm flex justify-between flex-1'
                      to={project.projectId}
                    >
                      {project.projectName}
                    </NavLink>
                    <div className='flex flex-row justify-center items-center gap-2 pr-2'>
                      <button onClick={() => handleEditProjectBtn(project.projectId)}>
                        <EditIcon className='hover:text-blue-500 cursor-pointer'/>
                      </button>
                      <button onClick={() => handleDeleteClick(project.projectId)}>
                        <DeleteIcon className='hover:text-red-500 cursor-pointer'/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0  bg-white/10 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[400px] text-center">
            <p className="text-lg font-semibold mb-4">Are you sure want to delete this project?</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 cursor-pointer"
                onClick={() => {
                  handleConfirmDelete(projectToDelete);
                  setShowConfirmModal(false);
                }}
              > Delete</button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-1.5 rounded hover:bg-gray-400 cursor-pointer"
                onClick={() => {
                  setShowConfirmModal(false);
                  setProjectToDelete(null);
                }}
              >Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuBar;
