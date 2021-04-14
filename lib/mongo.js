const { MongoClient } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASS = encodeURIComponent(config.dbPass);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true});
        this.dbName = DB_NAME;
    }

    connect() {
        if(MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if(err) {
                        reject(err);
                    }

                    console.log('Connected successfully to mongo');
                    resolve(this.client.db(this.dbName));
                })
            })
        }

        return MongoLib.connection;
    }
};

module.exports = MongoLib;