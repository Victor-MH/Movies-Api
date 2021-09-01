const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js');
const userMoviesApi = require('./routes/userMovies');

const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers');
const notFoundHanlder = require('./utils/middleware/notFoundHandler');
const helmet = require('helmet');


//body parser para leer correctamente los datos del body de un request
app.use(express.json());

//Routes
moviesApi(app);//Es decir después de esto °°
userMoviesApi(app);
//Captura error 404
app.use(notFoundHanlder);

//Middlewares
app.use(helmet());
/* Los middlewares de error siempre van al final de las rutas °° */
//Error middlewares
app.use(logErrors);
app.use(wrapErrors)
app.use(errorHandler);

app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
});

