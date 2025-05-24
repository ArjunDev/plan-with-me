import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './kanban/navbar';
import KanbanBoard from './kanban-board';

function App() {
  const  defaultId = "0";

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/project/:id' element={<KanbanBoard/>}/>

        {/* Catch-all routes other than defined one */}
        <Route path="*" element={<Navigate to={`/project/${defaultId}`} replace />} />
      </Routes>
    </>
    
  )
}

export default App
