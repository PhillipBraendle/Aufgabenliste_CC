import React from 'react';
import { useState } from 'react';
import axios from 'axios'; 
import './todo_input_field.css';

export function CreateTodo({ setTodos, todos }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // verhindert das Neuladen der Seite
        if (title.trim() === '') {
            alert('Der Titel ist erforderlich.');
            return;
        }
        
        const newTodo = { 
            title, 
            description
        };
        
        try {
            const response = await axios.post('http://localhost:2000/todos', newTodo, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.status === 200) {
                alert('To-Do erfolgreich hinzugefügt!');
                setTitle('');
                setDescription('');
                let receivedTodo = response.data;
                setTodos([...todos, receivedTodo]);
            } else {
                alert('Fehler beim Hinzufügen des To-Do-Items.');
            }
        } catch (error) {
            console.error(error);
            alert('Es ist ein Fehler aufgetreten.');
        }
    };
        
    return(
        <div className = "todoForm">  
          <div className = "formGroup">
            <label>
                Titel:
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} // Eingabe wird in title gespeichert
                    required
                    className="input-field"
                />
            </label>
        </div>
        <div className = "formGroup">
            <label>
                Beschreibung:
                <textarea 
                    placeholder="Beschreibung" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} // Eingabe wird in description gespeichert 
                    className="input-field"
                />
            </label>
        </div>
            <div>
            <button type="submit" className="submit-btn" onClick={handleSubmit}>Speichern</button>
            </div>
        </div>
    )
}