const Product = require('../models/Product');
const query = require('../db/index');
const app = require('../server');

exports.createHistory = async (req, res, next) => {
    if( req.app.global.data.counter == undefined )
        req.app.global.data.counter = 0;

    ++req.app.global.data.counter;
    req.app.global.store();

    res.send('counter: ' + req.app.global.data.counter);
}

exports.initCounter = (req, res, next) => {
    req.app.global.data.counter = 0;
    req.app.global.store();

    res.send('counter: ' + req.app.global.data.counter);
}