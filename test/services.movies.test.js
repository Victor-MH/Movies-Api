const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib');
const { moviesMock } = require('../utils/mocks/movies');

describe('services - movies', function() {
    const MoviesServices = proxyquire('../services/movies', {
        '../lib/mongo' : MongoLibMock
    });

    const moviesService = new MoviesServices();

    describe("when getMovies method is called", async function() {
        it('should call the getAll MongoLib method', async function() {
            await moviesService.getMovies({});
            assert.deepStrictEqual(getAllStub.called, true);
        });

        it('should return an array of movies', async function() {
            // const result = await moviesService.getMovies({});
            const result = await moviesService.getMovies({});
            const expected = moviesMock;
            // console.log( expected);
            // assert.deepEqual(result, expected);
            assert.notDeepStrictEqual(result, expected);
            /* Revisando documentación "deepEqual is deprecated"
            se debe usar notDeepStrictEqual */
        });
    });

});
