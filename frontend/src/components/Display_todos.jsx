import { useState } from 'react'

import axios from 'axios'

export function ToDoList({ mode, setmode }) {
    const [todos, setTodos] = useState([])
    getTodos(todos, setTodos)

    return (

        <div>
            {todos.length == 0 ? (
                <div className="toDoList">
                    <h1>To-Do List</h1>
                    <p id="toDo">To Do</p>
                    <div className="card">
                        <ul>
                            {todos.map((todo) => (
                                <li key={todo.id}>
                                    <h2 className="heading">{todo.title}</h2>
                                    <p className="description">{todo.description}</p>
                                    <button className="delete" onClick={deleteTodo(todo.id)}>Löschen</button>
                                    <button className="edit" onClick={setmode("edit")}>Bearbeiten</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (<p>Keine To-Dos vorhanden</p>
            )}
            <button onClick={setmode("create")}>Hinzufügen</button>
        </div>
    )
}

function getTodos(todos, setTodos) {
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