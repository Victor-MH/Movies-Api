const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js');
// app.get('/', function(req, res) {
//     res.send("Hello World");
// });

// app.get('/json', function(req, res) {
//     res.json("Hello JSON");
// });

moviesApi(app);

app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
});

