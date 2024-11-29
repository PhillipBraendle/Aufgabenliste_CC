import axios from 'axios'; 
import React from 'react';
import SaveOutlined from '@mui/icons-material/SaveOutlined';
import { useState } from 'react';
import './todo_input_field.css';

export function CreateTodo({ setTodos, todos }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [missingTitle, setMissingTitle] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // verhindert das Neuladen der Seite
        if (title.trim() === '') {
            setMissingTitle(true);
            return;
        }
        setMissingTitle(false);
        
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
        <div className = "todoForm p-4">  
          <div className = "formGroup">
            <label>
                Title:
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} // Eingabe wird in title gespeichert
                    required
                    className={`input-field ${missingTitle ? 'error' : ''}`}
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
            <button type="submit" className="btn btn-success me-2" onClick={handleSubmit}>
                <SaveOutlined />
                &ensp;Save
            </button>
            </div>
        </div>
    )
}