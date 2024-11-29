const express = require('express');

const app = express();
const port = 2000;
const server = require('http').createServer(app);
const fs = require('fs');
const path = require('path');
const expectedProperties = ['id', 'title', 'description'];

function getNewId(todosObject){
    const existingIds = todosObject.todos.map(todo => todo.id);
    let newId = 1;
    while (existingIds.includes(newId)) {
        newId++;
    }
    return newId;
}

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

app.post('/todos', express.json(), (req, res) => {
    const todosFilePath = path.join(__dirname, 'todos.json');
    const newTodo = req.body;

    // write todo item to file
    fs.readFile(todosFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        const todosObject = JSON.parse(data);
        
        // assign the id to the new todo item
        newTodo.id = getNewId(todosObject);

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
    const todoId = parseInt(req.params.id, 10);

    fs.readFile(todosFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        updatedTodo.id = todoId;
        const todosObject = JSON.parse(data);
        const todoIndex = todosObject.todos.findIndex(todo => todo.id === todoId);

        if (todoIndex === -1) {
            // create new todo item if its not found
            console.log('Todo item to modify not found, creating a new one');
            todosObject.todos.push(updatedTodo);
        } else {
            // update the todo item
            todosObject.todos[todoIndex] = updatedTodo;
        }

        fs.writeFile(todosFilePath, JSON.stringify(todosObject, null, 2), 'utf8', (err) => {
            if (err) {
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(200).send('Todo item updated');
        });
    });
});

app.delete('/todos/:id', (req, res) => {
    const todosFilePath = path.join(__dirname, 'todos.json');
    const todoId = parseInt(req.params.id, 10);

    // read the todos file
    fs.readFile(todosFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        const todosObject = JSON.parse(data);
        const todoIndex = todosObject.todos.findIndex(todo => todo.id === todoId);

        if (todoIndex === -1) {
            // this violates idempotency, but it makes more sense for this application
            res.status(404).send('Todo item not found');
            return;
        }

        // delete the todo item
        todosObject.todos.splice(todoIndex, 1);
        
        // write the updated todos to the file
        fs.writeFile(todosFilePath, JSON.stringify(todosObject, null, 2), 'utf8', (err) => {
            if (err) {
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(200).send('Todo item deleted');
        });
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});