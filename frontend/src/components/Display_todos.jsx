import { useState } from 'react'

import App from './App.jsx'
import axios from 'axios'
import './App.css'

export function ToDoList({mode,setmode}) {
    let todos = getTodos()
    if (todos.length === 0) {
        return <div>Fehler...</div>
    }

    return (
        <body>
            <div class="toDoList">
                <h1>To-Do List</h1>
                <p id="toDo">To Do</p>
                <p id="inProgress">In Progress</p>
                <p id="done">Done</p>
                <div className="card">
                    <ul>
                        {todos.map((todo) => (
                            <li key={todo.id}>
                                <h2 class = "heading">{todo.title}</h2>
                                <p class = "description">{todo.description}</p>
                                <button class = "delete" onClick={deleteTodo(todo.id)}>Löschen</button>
                                <button class = "edit" onClick={setmode("edit")}>Bearbeiten</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </body>

    )
}

function getTodos() {
    const [todos, setTodos] = useState([])
    axios.get('http://localhost:2000/todos')
        .then((response) => {
            setTodos(response.data)
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
}

function deleteTodo(id) {
    axios.delete('http://localhost:2000/todos/:' + id)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
}