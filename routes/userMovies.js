const express = require('express');
const UserMoviesService = require('../services/userMovies');
const validationHandler = require('../utils/middleware/validationHandler');
const { movieIdSchema } = require('../utils/schemas/movies');
const { userIdSchema } = require('../utils/schemas/users');
const {
    userMovieIdSchema,
    createUserMovieSchema
} = require('../utils/schemas/userMovies');
const {cacheResponse} = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS } = require('../utils/time');

function userMoviesApi(app) {
    const router = express.Router();
    app.use('/api/user-movies', router);

    const userMoviesService = new UserMoviesService();

    router.get('/', validationHandler({userId: userIdSchema}, 'query'), async function (req, res, next) { 
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

        const { userId } = req.query;
        console.log("\033[32m%s\x1b[0m","GET", "userMovies");

        try {
            const userMovies = await userMoviesService.getUserMovies({ userId });

            res.status(200).json({
                data: userMovies,
                message: 'userMovies listed'
            }) 
        } catch(err) {
            next(err);
        }
    })

    router.post("/", validationHandler(createUserMovieSchema), async function(req, res, next) {
        const { body: userMovie } = req;
        
        console.log("\033[33m%s\x1b[0m","POST", "userMovie");
        try {
            const createdUserMovieId = await userMoviesService.createUserMovie({ userMovie });

            res.status(201).json({
                data: createdUserMovieId,
                message: 'userMovie created'
            })
        } catch(err) {
            next(err);
        }
    });

    router.delete("/:userMovieId", validationHandler({ userMovieId: userMovieIdSchema}, 'params'), async function(req, res, next) {
        const { body: userMovieId } = req;
        try {
            const deletedUserMovieId = await userMoviesService.deleteUserMovie({ userMovieId });

            res.status(200).json({
                data: deletedUserMovieId,
                message: 'userMovie deleted'
            })
        } catch (err) {
            next(err);
        }
    })

}

module.exports = userMoviesApi;