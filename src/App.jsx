import React, { useContext } from 'react';
import { ElementsData } from '../../planwithme/src/assets/kanban/input-context';
import InputBar from '../../planwithme/src/assets/kanban/input-bar';
import StatusColumns from '../../planwithme/src/assets/kanban/status-columns';
import ProjectSummaryModal from '../../planwithme/src/assets/kanban/project-summary-modal';


function App() {
 
  const { projectSummaryModal } = useContext(ElementsData); 
  // global context state
  console.log(projectSummaryModal)

  return (
      <div className="flex flex-col items-center w-full bg-blue-50 ">
        {projectSummaryModal.kanban.isOpen && <ProjectSummaryModal/>}
        <InputBar/>
        <div className="w-full overflow-x-auto">
          <StatusColumns />
        </div>
      </div>
  )
}

export default App
