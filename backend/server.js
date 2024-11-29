const express = require('express');

const app = express();
const port = 2000;
const server = require('http').createServer(app);

app.get('/todos', (req, res) => {
    res.json({});
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});