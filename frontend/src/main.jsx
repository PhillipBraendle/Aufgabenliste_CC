import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CreateTodo } from './components/CreateTodo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CreateTodo />
  </StrictMode>,
)
