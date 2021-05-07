const { config } = require('../config');

function cacheResponse(res, seconds) {
    if(!config.dev) {
        res.set('Cache-Control', `public, max-age=${seconds}`);
    }
}

module.exports = {cacheResponse}

//No todas las rutas deben tener cache, solo las que estamos requiriendo recursos
//Si vamos a crear una nueva pelicula no necesitamos cache, porque ocurre en el momento
//Cuando las requerimos, esto ocurre frecuentemente, entonces conviene tenerlas en cache
