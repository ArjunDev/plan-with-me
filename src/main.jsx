import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { InputContext } from '../../planwithme/src/kanban/input-context';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InputContext>
    <App />
    </InputContext>
  </StrictMode>,
)
