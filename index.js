const express = require('express');
const app = express();

const { config } = require('./config/index');

app.get('/', function(req, res) {
    res.send("Hello World");
});

app.get('/json', function(req, res) {
    res.json("Hello JSON");
});

app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
});

