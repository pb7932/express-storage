const Product = require('../models/Product');
const {query} = require('../db/index');
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

exports.getHistory = async (req, res, next) => {
    let counter = req.app.global.data.counter;

    if(counter && counter > 0) {
        let version = (req.query.version <= counter && req.query.version > 0) ? req.query.version : counter;

        const sql = `SELECT * FROM history${version}`;
        const result = await (await query(sql, [])).rows;

        console.log(result);

        res.send(result);
    }
    else {
        console.log('no history table has been made yet');
        res.send(null);
    }
}
    