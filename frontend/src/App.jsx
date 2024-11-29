import { useState } from 'react'

import { ToDoList } from './components/Display_todos'
import './App.css'


const {mode,setmode} = useState("toDoList")
const {ids,setIds} = useState([])

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      if (mode === "toDoList") {
        <ToDoList mode={mode} setmode={setmode} />
      }


    </>
  )
}

export default App
