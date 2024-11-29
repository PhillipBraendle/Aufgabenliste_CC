import { useState } from 'react'

import { ToDoList } from './components/Display_todos'
import { EditTodo } from './components/EditTodo'
import { CreateTodo } from './components/CreateTodo'
import './App.css'



function App() {
  const [count, setCount] = useState(0)
  const [mode,setmode] = useState("toDoList")

  console.log(mode);
  let content
  if (mode === "toDoList") {
    content = <ToDoList setmode={setmode}/>
  } else if (mode === "edit") {
    content = <EditTodo setmode={setmode}/>
  }
  return (
    <div>
     {content} 
    </div>


  )
}

export default App
