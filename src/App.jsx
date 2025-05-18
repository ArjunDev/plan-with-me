import React, { useContext } from 'react';
import { ElementsData } from '../../planwithme/src/kanban/input-context';
// import InputBar from '../../planwithme/src/kanban/input-bar';
import StatusBoard from './kanban/status-board';
import ProjectSummaryModal from '../../planwithme/src/kanban/project-summary-modal';
import ProjectDashBoard from './kanban/project-dashboard';


function App() {
  const { projectSummaryModal } = useContext(ElementsData); 
  // global context state
  // console.log(projectSummaryModal)

  return (
      <div className="flex flex-col items-center w-full bg-gray-500 ">
        {/* {projectSummaryModal.kanban.isOpen && <ProjectSummaryModal/>} */}
        <div className='flex justify-center items-center bg-amber-100 w-full h-12 border rounded '>
          Nav bar
        </div>
        <div className="w-full flex bg-amber-50 p-4 gap-4">
          <StatusBoard />
          <ProjectDashBoard />
        </div>
      </div>
  )
}

export default App
