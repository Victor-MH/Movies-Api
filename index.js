const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js');
const { logErrors, errorHandler } = require('./utils/middleware/errorHandlers');



//body parser para leer correctamente los datos del body de un request
app.use(express.json());

moviesApi(app);//Es decir después de esto

//middlewares
/* Los middlewares de error siempre van al final de las rutas */
app.use(logErrors);
app.use(errorHandler);

app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
});

