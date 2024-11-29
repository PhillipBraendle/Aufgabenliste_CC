import axios from 'axios';
import React from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export function ToDoList({ editingTodo, setEditingTodo, todos, setTodos }) {

  return (
    <div className="container mt-4">
      {todos.length !== 0 && (
        <div className="toDoList">
          <div className="card shadow-sm" style={{backgroundColor: '#D3D3D3'}}>
            <div className="card-body" style={{width: '500px'}}>
              <h3 className="card-title ">My To-Do List</h3>
              <ul className="list-group list-group-flush">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="list-group-item flex-column justify-content-between align-items-center"
                    style={{backgroundColor: '#D3D3D3'}}
                  >
                    <div>
                      <h5 className="mb-1 mt-4">{todo.title}</h5>
                      <p className="mb-1 text-muted p-2">{todo.description}</p>
                    </div>
                    <div className = "pt-3 pb-2">
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => {
                          if (editingTodo == null) {
                            setEditingTodo(todo)
                            window.scrollTo({ top: 0, behavior: "smooth" }); 
                          }
                        }}
                      >
                        <EditOutlinedIcon />
                        &ensp;Edit
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteTodo(todo.id, setTodos, todos)}
                      >
                        <DeleteOutlinedIcon />
                        &ensp;Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function deleteTodo(id, setTodos, todos) {
    axios.delete('http://localhost:2000/todos/' + id)
        .then((response) => {
            const todoIndex = todos.findIndex(todo => todo.id === id);
            todos.splice(todoIndex, 1);
            // set todos to shallow copoy so refference changes (needed for react to rerender)
            setTodos([...todos]);
        })
        .catch((error) => {
            console.log(error)
        })
}