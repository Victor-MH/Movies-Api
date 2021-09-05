const express = require('express');
const passport = require('passport');

const MoviesService = require("../services/movies");
const validationHandler = require('../utils/middleware/validationHandler');
const {
    movieIdSchema,
    createMoviewSchema,
    updateMovieSchema
} = require('../utils/schemas/movies');
const {cacheResponse} = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS,
        SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time')

require('../utils/auth/strategies/jwt');
// const { moviesMock } = require('../utils/mocks/movies');
/*La unicaresponsabilidad de las rutas es saber como recibe parametros y
  como se los pasa a los servcios*/
/*Los servicios si saben que hacer con esos parametros/datos y saben 
  devolver la info requerida*/

function moviesApi(app) {
    const router = express.Router();
    app.use("/api/movies", router);

    // function protectRoutes(req, res, next) {
    //     passport.authenticate('jwt', { session: false })
    //     //  => { res.status(301).json({message: "imposible to connect"})});
    // } 
        

    const moviesService = new MoviesService();

    router.get("/", passport.authenticate('jwt', { session: false }), async function(req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        // res.set('Cache-Control', `public, max-age=${300}`)

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

    router.get("/:movieId", passport.authenticate('jwt', { session: false }), validationHandler({ movieId: movieIdSchema }, 'params'), async function(req, res, next) {
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
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
                                        //por defecto viene en el body
    router.post("/", passport.authenticate('jwt', { session: false }), validationHandler(createMoviewSchema), async function(req, res, next) {
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

    router.put("/:movieId", passport.authenticate('jwt', { session: false }), validationHandler({ movieId: movieIdSchema }, 'params'), validationHandler(updateMovieSchema, 'body'), async function(req, res, next) {
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

    router.delete("/:movieId", passport.authenticate('jwt', { session: false }), validationHandler({ movieId: movieIdSchema }, 'params'), async function(req, res, next) {
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

    router.patch("/:movieId", passport.authenticate('jwt', { session: false }), async function(req, res, next) {
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