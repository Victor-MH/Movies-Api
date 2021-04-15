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

//body parser para leer correctamente los datos del body de un request
app.use(express.json());

moviesApi(app);

app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
});

