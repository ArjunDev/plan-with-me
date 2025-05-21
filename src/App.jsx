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
        <Route path="/" element={<Navigate to={`/${defaultId}`} replace />} />
        <Route path='/:id' element={<KanbanBoard/>}/>
      </Routes>
    </>
    
  )
}

export default App
