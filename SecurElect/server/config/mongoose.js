const mongoose = require('mongoose');
const util = require('util');
const debug = require('debug')('express-mongoose-es6-rest-api:index');
const config = require('../config/config');

const mongoUri = config.mongo.mongo_uri;

mongoose.connect( mongoUri, { keepAlive: 1, useNewUriParser: true, useFindandModify: false } );

const mngdb = mongoose.connection;

mngdb.once( 'open', () => {
    console.log(`CONNECTED TO THE MONGODB : URI : ${mongoUri}`);
});

mngdb.on( 'error', () => {
    throw new Error(`FAILURE to connect to database :: URI : ${mongoUri}`);
});

if(config.mongo.isDebug){
    mongoose.set( 'debug', (collectionName, method, query, doc) => {
        debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
}

module.exports = mngdb;