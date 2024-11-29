import { useState } from 'react'
import { useEffect} from 'react';

import { EditTodo } from './EditTodo';

import axios from 'axios'

export function ToDoList({setmode,setSelectedId ,setTodo}) {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        getTodos(todos, setTodos);
      }, []);

    return (

        <div>
            {todos.length !== 0 ? (
                <div className="toDoList">
                    <h1>To-Do List</h1>
                    <p id="toDo">To Do</p>
                    <div className="card">
                        <ul>
                            {todos.map((todo) => (
                                <li key={todo.id}>
                                    <h2 className="heading">{todo.title}</h2>
                                    <p className="description">{todo.description}</p>
                                    <button className="delete" onClick={() => deleteTodo(todo.id, setTodos, todos)}>Löschen</button>
                                    <button className="edit" onClick={() => editTodo(setmode,setSelectedId,todo.id,setTodo,todos)}>Bearbeiten</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (<p>Keine To-Dos vorhanden</p>
            )}
            <button onClick={() => setmode("create")}>Hinzufügen</button>
        </div>
    )
}

function getTodos(todos, setTodos) {
    axios.get('http://localhost:2000/todos')
        .then((response) => {
            setTodos(response.data.todos)
        })
        .catch((error) => {
            console.log(error)
        })
}

function deleteTodo(id, setTodos, todos) {
    axios.delete('http://localhost:2000/todos/' + id)
        .then((response) => {
            getTodos(todos, setTodos);
        })
        .catch((error) => {
            console.log(error)
        })
    
}
function editTodo(setmode, setSelectedId, id,setTodo,todos) {
    setmode("edit");
    setTodo(todos);
    setSelectedId(id);
}