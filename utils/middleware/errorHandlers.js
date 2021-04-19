const { config } = require('../../config');
const boom = require('@hapi/boom');
/*Dependiendo de si esta en desarrollo o producción quiero que se muestre
todo el stack de información del error o no*/

function withErrorStack(error, stack) { //Este no es un middleware
    if(config.dev) {
        return {...error, stack};
    }

    return error;
}

function logErrors(err, req, res, next) {
    console.log(err);
    next(err);
}

function wrapErrors(err, req, res, next) {
    if(!err.isBoom) {
        next(boom.badImplementation(err));
    }

    next(err);
}

//si eslint da problemas porque no se usa un parametro podemos hacer que lo ignore con ese comentario
function errorHandler(err, req, res, next) { //eslint-disable-line
    const { output: { statusCode, payload } } = err;
    
    res.status(statusCode);
    res.json(withErrorStack(payload, err.stack));
}


module.exports = {
    logErrors,
    wrapErrors,
    errorHandler
}