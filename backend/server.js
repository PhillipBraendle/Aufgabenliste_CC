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

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});