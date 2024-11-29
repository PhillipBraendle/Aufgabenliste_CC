import axios from 'axios';

import { useState } from 'react';
import { useEffect } from 'react';
import { ToDoList } from './components/TodoList';
import { EditTodo } from './components/EditTodo';
import { CreateTodo } from './components/CreateTodo';
import './App.css';

function getTodos(todos, setTodos) {
  axios.get('http://localhost:2000/todos')
      .then((response) => {
          setTodos(response.data.todos)
      })
      .catch((error) => {
          console.log(error)
      })
}

function App() {
  const [todos, setTodos] = useState([])
  const [editingTodo, setEditingTodo] = useState(null)

  useEffect(() => {
    getTodos(todos, setTodos);
  }, []);

  return (
    <div>
    <h1>To-Do List</h1>
    <hr ></hr>    
    {!editingTodo && <CreateTodo
      setTodos={setTodos}
      todos={todos} />
    }

    {editingTodo && 
      <EditTodo
        editingTodo={editingTodo}
        setEditingTodo={setEditingTodo}
        todos={todos}
      />
    }
    <hr></hr>
    <ToDoList 
    editingTodo={editingTodo}
    setEditingTodo={setEditingTodo}
    todos={todos}
    setTodos={setTodos}/>
    </div>
  )
}

export default App
