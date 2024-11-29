import { useState } from 'react'

import { ToDoList } from './components/Display_todos'
import { EditTodo } from './components/EditTodo'
import { CreateTodo } from './components/CreateTodo'
import './App.css'


function App() {
  const [mode,setmode] = useState("toDoList")
  const [selectedId, setSelectedId] = useState(null);
  const [todos, setTodo] = useState([])

  console.log(mode);
  let content
  if (mode === "toDoList") {
    content = <ToDoList setmode={setmode} setSelectedId = {setSelectedId} setTodo = {setTodo}/>
  } else if (mode === "create") {
    content = <CreateTodo setmode={setmode}/>
  } else if (mode === "edit") {
    content = <EditTodo id={selectedId} setmode={setmode} setTodo = {setTodo}/>
  }
  return (
    <div>
     {content} 
    </div>


  )
}

export default App
