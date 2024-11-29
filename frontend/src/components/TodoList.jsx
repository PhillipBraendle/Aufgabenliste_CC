import axios from 'axios'

export function ToDoList({ setEditingTodo, todos, setTodos }) {       
    return (
        <div>
            {todos.length !== 0 &&
                <div className="toDoList">
                    <div className="card">
                        <ul>
                            {todos.map((todo) => (
                                <li key={todo.id}>
                                    <h2 className="heading">{todo.title}</h2>
                                    <p className="description">{todo.description}</p>
                                    <button className="delete" onClick={() => deleteTodo(todo.id, setTodos, todos)}>Löschen</button>
                                    <button className="edit" onClick={() => setEditingTodo(todo)}>Bearbeiten</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
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