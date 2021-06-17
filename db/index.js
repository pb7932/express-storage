const Sequelize = require('sequelize');
const {Pool} = require('pg');
const config = require('./config');

const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        host: config.host,
        dialect: config.user,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
});

const pool = new Pool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port,
    max: 5
})

const query = (text,params) => {
    const start = Date.now();
    return pool.query(text,params)
        .then(res => {
            const duration = Date.now()-start;
            console.log('executed query: ' + text + ', duration: ' + duration)
            return res
        })
}

module.exports = {sequelize, query};