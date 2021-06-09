const Product = require('../models/Product');
const {query} = require('../db/index');
const app = require('../server');

exports.createHistory = async (req, res, next) => {
    //get the new tables version, increase it and store it
    if( req.app.global.data.counter == undefined )
        req.app.global.data.counter = 0;

    let counter = ++req.app.global.data.counter;
    req.app.global.store();

    await createNewHistoryTable(counter);
    
    await seedHistoryTable(counter, req.body.products);

    res.send('counter: ' + counter);
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

        res.send(result);
    }
    else {
        console.log('no history table has been made yet');
        res.send(null);
    }
}

let createNewHistoryTable = async (version) => {
    const sql = `CREATE TABLE history${version} (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        price SMALLINT NOT NULL,
        ingredients TEXT NOT NULL,
        calories SMALLINT NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        url TEXT NOT NULL 
    )`

    try {
        await query(sql, []);
    }
    catch (err) {
        console.log('An error occured while creating a history table: ' + err);
    }
} 

let seedHistoryTable = async (version, products) => {
    const sql = `INSERT INTO history${version} (name, price, ingredients, calories, quantity, url) 
                                        values ($1, $2, $3, $4, $5, $6)`;

    try {
        for ( let product of products )
            await query(sql,[product.name, product.price, product.ingredients, 
                            product.calories, product.quantity, product.url]);
    }
    catch (err) {
        console.log('An error occured while seeding the history table' + err);
    }
}
    