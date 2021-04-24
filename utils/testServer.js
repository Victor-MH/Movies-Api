/* No vamos a probar todo nuestro servidor, en cambio queremos
 probar en un servidor muy perquñito el cual es este y para
 el cual creamos algunos metodos http en los mocks*/

const express = require('express');
const supertest = require('supertest');

function testServer(route) {
    const app = express();
    route(app);
    return supertest(app);
}

module.exports = testServer;