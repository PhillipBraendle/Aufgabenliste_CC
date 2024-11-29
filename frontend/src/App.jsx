import { useState } from 'react'

import { ToDoList } from './components/Display_todos'
import { EditTodo } from './components/EditTodo'
import { CreateTodo } from './components/CreateTodo'
import './App.css'



function App() {
  const [count, setCount] = useState(0)
  const {mode,setmode} = useState("toDoList")
  const {ids,setIds} = useState([])

  let content


  return (
    <div>
      {mode === "toDoList" ? (
        <ToDoList mode={mode} setmode={setmode} />
      ) : (
        <CreateTodo setmode={setmode} />
      )}
    </div>


  )
}

export default App
