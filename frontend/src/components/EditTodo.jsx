import React from 'react';
import axios from 'axios';

import { useState } from 'react';
import { useEffect } from 'react';

import './todo_input_field.css';


export function EditTodo({editingTodo, setEditingTodo, todos, setTodos}) {
    const [title, setTitle] = useState(editingTodo.title);
    const [description, setDescription] = useState(editingTodo.description);

    let id = editingTodo.id;
    useEffect(() => {
        setTitle(editingTodo.title);
        setDescription(editingTodo.description);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title.trim() === '') {
            return;
        }
        
        try {
            const response = await axios.put('http://localhost:2000/todos/' + id, 
            {
                title,
                description,
            },
            { 
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.status === 200) {
                setTitle('');
                setDescription('');
                let receivedTodo = response.data;
                const todoIndex = todos.findIndex(todo => todo.id === receivedTodo.id);
                todos[todoIndex] = receivedTodo;
                setEditingTodo(null);
            } else {
                alert('Fehler beim Hinzufügen des To-Do-Items.');
            }
        } catch (error) {
            console.error(error);
            alert('Es ist ein Fehler aufgetreten.');
        }
    };

    const handleCancel = () => {
        setEditingTodo(null);
    };

    return(
        <div className = "todoForm p-3">
            <div className = "formGroup">
                <label>
                    Title:
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="input-field"
                    />
                </label>
            </div>
            <div className = "formGroup">
                <label>
                    Description:
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} // Eingabe wird in description gespeichert 
                    className="input-field"
                />
                </label>
            </div>
            <div>
                <button type="submit" className='btn  btn-sm btn-primary me-2' onClick={handleSubmit}>Speichern</button>
                <button type="button" className='btn btn-sm btn-danger' onClick={handleCancel}>Abbrechen</button>
            </div>
        </div>
    )

}