const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js');
const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers');
const notFoundHanlder = require('./utils/middleware/notFoundHandler');


//body parser para leer correctamente los datos del body de un request
app.use(express.json());

//Routes
moviesApi(app);//Es decir después de esto °°
//Captura error 404
app.use(notFoundHanlder);

//Middlewares

/* Los middlewares de error siempre van al final de las rutas °° */
//Error middlewares
app.use(logErrors);
app.use(wrapErrors)
app.use(errorHandler);

app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
});

