import React, { useContext } from 'react';
import { allProjectsData } from '../kanban/input-context';
import StatusBoard from '../kanban/status-board';
// import ProjectSummaryModal from '../../planwithme/src/kanban/project-summary-modal';
import ProjectDashBoard from '../kanban/project-dashboard';

function KanbanBoard() {
  // const { projectSummaryModal } = useContext(allProjectsData); 
  // global context state
  // console.log(projectSummaryModal)

  return (
      <div className="flex flex-col items-center w-full bg-gray-200">
        {/* {projectSummaryModal.kanban.isOpen && <ProjectSummaryModal/>} */}
        <div className="w-full flex p-4 gap-4">
          <StatusBoard />
          <ProjectDashBoard />
        </div>
      </div>
  )
}

export default KanbanBoard
