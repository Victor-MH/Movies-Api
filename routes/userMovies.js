const express = require('express');
const passport = require('passport');

const UserMoviesService = require('../services/userMovies');
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

// const { movieIdSchema } = require('../utils/schemas/movies');
const { userIdSchema } = require('../utils/schemas/users');
const {
    userMovieIdSchema,
    createUserMovieSchema
} = require('../utils/schemas/userMovies');
const {cacheResponse} = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS } = require('../utils/time');

require('../utils/auth/strategies/jwt');

function userMoviesApi(app) {
    const router = express.Router();
    app.use('/api/user-movies', router);

    const userMoviesService = new UserMoviesService();

    router.get('/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:user-movies']),
        validationHandler({userId: userIdSchema}, 'query'),
        async function (req, res, next) { 
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
        }
    );

    router.post("/",
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['create:user-movies']),
        validationHandler(createUserMovieSchema),
        async function(req, res, next) {
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
        }
    );

    router.delete("/:userMovieId",
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['delete:user-movies']),
        validationHandler({ userMovieId: userMovieIdSchema}, 'params'),
        async function(req, res, next) {
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
        }
    );

}

module.exports = userMoviesApi;