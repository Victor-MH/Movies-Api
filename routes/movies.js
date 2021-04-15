const express = require('express');
const MoviesService = require("../services/movies");
// const { moviesMock } = require('../utils/mocks/movies');
/*La unicaresponsabilidad de las rutas es saber como recibe parametros y
  como se los pasa a los servcios*/
/*Los servicios si saben que hacer con esos parametros/datos y saben 
  devolver la info requerida*/

function moviesApi(app) {
    const router = express.Router();
    app.use("/api/movies", router);

    const moviesService = new MoviesService();

    router.get("/", async function(req, res, next) {
        const { tags } = req.query;
        console.log("\033[32m%s\x1b[0m","GET", "Movies");
        try {
            const movies = await moviesService.getMovies({ tags });
            //Para probar el middleware para manejo de errores
            //throw new Error("Error getting movies");

            res.status(200).json({
                data: movies,
                message: 'movies listed'
            })
        } catch(err) {
            next(err);
        }
    });

    router.get("/:movieId", async function(req, res, next) {
        const { movieId } = req.params;//tiene que ser igual al de la url
        
        console.log("\033[32m%s\x1b[0m","GET", "Movie");
        try {
            const movie = await moviesService.getMovie({ movieId });
            
            res.status(200).json({
                data: movie,
                message: 'movie listed'
            })

        } catch (err) {
            next(err);
        }
    })

    router.post("/", async function(req, res, next) {
        const { body: movie } = req;  //para poner un alias al body
        //console.log(movie);
        
        console.log("\033[33m%s\x1b[0m","POST", "Movie");
        try {
            const createdMovieId = await moviesService.createMovie({ movie });

            res.status(201).json({
                data: createdMovieId,
                message: 'movie created'
            })
        } catch(err) {
            next(err);
        }
    });

    router.put("/:movieId", async function(req, res, next) {
        const { movieId } = req.params;
        const { body: movie } = req;
        
        console.log("\033[34m%s\x1b[0m","PUT", "Movie");
        try {
            const updatedMovieId = await moviesService.updateMovie({ movieId, movie });

            res.status(200).json({
                data: updatedMovieId,
                message: 'movie updated'
            })
        } catch(err) {
            next(err);
        }
    });

    router.delete("/:movieId", async function(req, res, next) {
        const { movieId } = req.params;
        
        console.log("\033[31m%s\x1b[0m","DELETE", "Movie");
        try {
            const deletedMovieId = await moviesService.deleteMovie({ movieId });

            res.status(200).json({
                data: deletedMovieId,
                message: 'movie deleted'
            })
        } catch(err) {
            next(err);
        }
    });

    router.patch("/:movieId", async function(req, res, next) {
        const { movieId } = req.params;
        
        console.log("\033[35m%s\x1b[0m","PATCH", "Movie");
        try {
            const fixedMovieId = await moviesService.fixMovie({ movieId });

            res.status(200).json({
                data: fixedMovieId,
                message: 'movie fixed'
            })
        } catch(err) {
            next(err);
        }
    });
}

module.exports = moviesApi;