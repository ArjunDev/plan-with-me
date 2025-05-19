import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './kanban/navbar';
import KanbanBoard from './kanban-board';

function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/:id' element={<KanbanBoard/>}/>
      </Routes>
    </>
    
  )
}

export default App
