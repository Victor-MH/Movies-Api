const assert = require('assert');
const proxyquire = require('proxyquire');
/*Ayuda a que cuando escribamos un require, podemos elegir
 que en lugar de que nos traiga el paquete real, nos traiga un mock*/

/*NO queremos que llame a nuestros servicios porque el objetivo de 
este test es probar que las rutas estan haciendo su trabajo, después
se hace directamente */

 const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies');
 const testServer = require('../utils/testServer');

 describe('routes - movies', function() {
    const route = proxyquire('../routes/movies', {
        //Cada que llamemos la ruta quien va a responder será MoviesServiceMock
        '../services/movies': MoviesServiceMock
    }) ;

    //usamos testserver y solo cargamos esa ruta, haciendo el test 
    //especifico a esa ruta

    const request = testServer(route)

    describe('GET /movies', function() {
        it('should respond with status 200', function(done) {
            request.get('/api/movies').expect(200, done);
        });

        it('should respond with the list of movies', function(done) {
            request.get('/api/movies').end((err, res) => {
                assert.deepStrictEqual(res.body, {
                    data: moviesMock,
                    message: 'movies listed'
                });

                done();
            });
        });

     });
}); 