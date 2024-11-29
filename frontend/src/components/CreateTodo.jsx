import React from 'react';
import { useState } from 'react';
import axios from 'axios'; 
import './CreateTodo.css';

export function CreateTodo({ids, setIds}, {mode, setMode}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // verhindert das Neuladen der Seite

        setMode('toDoList');
    
        if (title.trim() === '') {
          alert('Der Titel ist erforderlich.');
          return;
        }
        
        const newTodo = { 
            title, 
            description,
            state: 'todo',
            id: findFreeId({ids}),
        };

        setIds([...ids, newTodo.id]); // neue ID wird in die Liste der IDs eingefügt

        try {
            const response = await axios.post('http://localhost:2000/todos', newTodo, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (response.status === 201) {
              alert('To-Do erfolgreich hinzugefügt!');
              setTitle('');
              setDescription('');
            } else {
              alert('Fehler beim Hinzufügen des To-Do-Items.');
            }
          } catch (error) {
            console.error(error);
            alert('Es ist ein Fehler aufgetreten.');
          }
    };

    const handleCancel = () => {
        setTitle('');
        setDescription('');
        alert('Eingaben zurückgesetzt.');
    };

    const findFreeId = ({ids}) => {
        let id = 1;
        while (ids.includes(id)){
            id++;
        }
        return id;
    };
        
    return(
        <div className = "todoForm">  
          <div className = "formGroup">
            <label className>
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
            <button type="button" className="cancel-btn" onClick={handleCancel}>Abbrechen</button>
            </div>
        </div>
    )
}