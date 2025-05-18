import React, { useContext } from 'react';
import { ElementsData } from '../../planwithme/src/kanban/input-context';
import StatusBoard from './kanban/status-board';
// import ProjectSummaryModal from '../../planwithme/src/kanban/project-summary-modal';
import ProjectDashBoard from './kanban/project-dashboard';
import NavBar from './kanban/navbar';


function App() {
  const { projectSummaryModal } = useContext(ElementsData); 
  // global context state
  // console.log(projectSummaryModal)

  return (
      <div className="flex flex-col items-center w-full bg-gray-300 ">
        {/* {projectSummaryModal.kanban.isOpen && <ProjectSummaryModal/>} */}
        <NavBar/>
        <div className="w-full flex p-4 gap-4 mt-6">
          <StatusBoard />
          <ProjectDashBoard />
        </div>
      </div>
  )
}

export default App
