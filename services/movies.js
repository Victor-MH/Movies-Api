const { moviesMock } = require("../utils/mocks/movies");

class MoviesService {
    async getMovies() {
        const movies = await Promise.resolve(moviesMock);
        return movies || [];
    }

    async getMovie(req) {
        const movie = await Promise.resolve(moviesMock.filter(movie => movie.id === req.movieId));
        return movie || {};
    }

    async createMovie() {
        const createdMovieId = await Promise.resolve(moviesMock[0].id);
        return createdMovieId || {};
    }

    async updateMovie(req) {
        const updatedMovieId = await Promise.resolve(req.movieId, req.movie);
        return updatedMovieId || {};
    }

    async deleteMovie(req) {
        const deletedMovieId = await Promise.resolve(req.movieId);
        return deletedMovieId || {};
    }

    async fixMovie() {
        const fixedMovieId = await Promise.resolve(moviesMock[0].id);
        return fixedMovieId || {};
    }
};

module.exports = MoviesService;