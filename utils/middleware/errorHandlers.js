const { config } = require('../../config');
/*Dependiendo de si esta en desarrollo o producción quiero que se muestre
todo el stack de información del error o no*/

function withErrorStack(error, stack) { //Este no es un middleware
    if(config.dev) {
        return {error, stack};
    }

    return error;
}

function logErrors(err, req, res, next) {
    console.log(err);
    next(err);
}

//si eslint da problemas porque no se usa un parametro podemos hacer que lo ignore con ese comentario
function errorHandler(err, req, res, next) { //eslint-disable-line
    res.status(err.status || 500);
    res.json(withErrorStack(err.message, err.stack));
}


module.exports = {
    logErrors,
    errorHandler
}