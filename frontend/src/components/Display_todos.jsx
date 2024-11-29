import { useState } from 'react'

import axios from 'axios'

export function ToDoList({mode,setmode}) {
    const [todos, setTodos] = useState([])
    getTodos(todos,setTodos)
    if (todos === null) {
        return <div>Noch keine To-dos</div>
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
    axios.get('http://localhost:2000/todos')
        .then((response) => {
            setTodos(response.data)
            console.log(response)
            return todos
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