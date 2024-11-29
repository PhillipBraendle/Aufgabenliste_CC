import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './todo_input_field.css';

export function EditTodo({id, setmode}, todos) {
    let todo = todos.find(todo => todo.id === id);


    let todoTitle = todo.title;
    let todoDescription = todo.description;

    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title.trim() === '') {
            alert('Der Titel ist erforderlich.');
            return;
        }
        
        try {
            const response = await axios.put('http://localhost:2000/todos/:${id}', 
            {
                title,
                description,
            },
            { 
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.status === 201) {
                alert('To-Do erfolgreich hinzugefügt!');
            } else {
                alert('Fehler beim Hinzufügen des To-Do-Items.');
            }
        } catch (error) {
            console.error(error);
            alert('Es ist ein Fehler aufgetreten.');
        }

        setmode('toDoList');

    };

    const handleCancel = () => {
        setTitle(todoTitle);
        setDescription(todoDescription);       
        alert('Eingaben zurückgesetzt.');
        setmode('toDoList');
    };

    return(
        <div className = "todoForm">
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
                    <input 
                        type="text" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        className="input-field"
                    />
                </label>
            </div>
            <div>
                <button type="submit" onClick={handleSubmit}>Speichern</button>
                <button type="button" onClick={handleCancel}>Abbrechen</button>
            </div>
        </div>
    )

}