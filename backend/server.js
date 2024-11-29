const express = require('express');

const app = express();
const port = 2000;
const server = require('http').createServer(app);
const fs = require('fs');
const path = require('path');

app.get('/todos', (req, res) => {
    const todosPath = path.join(__dirname, 'todos.json');

    fs.readFile(todosPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(JSON.parse(data));
    });
});

function hasExactProperties(obj, properties) {
    const objKeys = Object.keys(obj);

    return (
        properties.length === objKeys.length && // Number of properties must match
        properties.every((property) => objKeys.includes(property)) // All required properties must exist
    );
}

app.post('/todos', express.json(), (req, res) => {
    const todosFilePath = path.join(__dirname, 'todos.json');
    const newTodo = req.body;
    
    // Check if todo item is structured correctly
    const expectedProperties = ['id', 'title', 'description', 'state'];
    if (!hasExactProperties(newTodo, expectedProperties)) {
        res.status(400).send('Todo item structure is invalid');
        return;
    }

    // write todo item to file
    fs.readFile(todosFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        const todosObject = JSON.parse(data);

        // assert item id doesn't already exist
        for(todo in todosObject.todos) {
            if (todo.id === newTodo.id) {
                res.status(400).send('ID already exists, update todo list and try again');
                return;
            }
        }
        
        // add new todo item to the todosfile
        todosObject.todos.push(newTodo);
        fs.writeFile(todosFilePath, JSON.stringify(todosObject, null, 2), 'utf8', (err) => {
            if (err) {
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(201).send('Todo item added');
        });
    });
});

app.put('/todos/:id', express.json(), (req, res) => {
    const todosFilePath = path.join(__dirname, 'todos.json');
    const updatedTodo = req.body;
    const todoIdUrl = req.params.id;

    // Check if ID in URL matches ID in request body
    if (updatedTodo.id !== todoIdUrl) {
        res.status(400).send('ID in URL does not match ID in todo item');
        return;
    }

    // Check if todo item is structured correctly
    const expectedProperties = ['id', 'title', 'description', 'state'];
    if (!hasExactProperties(updatedTodo, expectedProperties)) {
        res.status(400).send('Todo item structure is invalid');
        return;
    }

    fs.readFile(todosFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        const todosObject = JSON.parse(data);
        const todoIndex = todosObject.todos.findIndex(todo => todo.id === updatedTodo.id);

        if (todoIndex === -1) {
            res.status(404).send('Todo item not found');
            return;
        }

        todosObject.todos[todoIndex] = updatedTodo;

        fs.writeFile(todosFilePath, JSON.stringify(todosObject, null, 2), 'utf8', (err) => {
            if (err) {
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(200).send('Todo item updated');
        });
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});