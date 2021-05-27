const express = require('express');
const app = express();
const db = require('./db/index');
const Product = require('./models/Product');
const seed = require('./db/seed');


app.listen(8080);