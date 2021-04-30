const sinon = require('sinon')
//inyecta unas propiedades que determinan si 
//estos fueron llamados o no, util para probar si cuando el servicio
//fue ejecutado llamo o no a los metodos de las librerias
const { moviesMock, filteredMoviesMocks } = require('./movies');

const getAllStub = sinon.stub();
getAllStub.withArgs('movies').resolves(moviesMock);

const tagQuery = { tags: {$in: ["Drama"]} }
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMocks('Drama'));

const createStub = sinon.stub().resolves(moviesMock[0].id);

class MongoLibMock {
    getAll(collection, query) {
        return getAllStub(collection, query);
    }

    create(collection, data) {
        return createStub(collection, data);
    }
}

module.exports = {
    getAllStub,
    createStub,
    MongoLibMock
}
