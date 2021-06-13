const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const {sequelize} = require('./db/index');


//authentication to a database to be able to run queries
sequelize.authenticate().then(console.log('[DB] Authentication completed.'));


//console logging a request method and url
app.use((req, res, next) => {
    console.log(req.method + ' ' + req.url);
    next();
});


app.use(express.json());
app.use(express.urlencoded({extended: true}));


var corsOptions = {
    origin: "http://localhost:4200"
};
app.use(cors(corsOptions));


//importing routers
const productRouter = require('./routes/product.routes');
const historyRouter = require('./routes/history.routes');


//connecting routers to their urls
app.use('/api/products', productRouter);
app.use('/api/history', historyRouter);
app.get('/', (req,res) => {
    res.send('Welcome to my server!');
})


//initializing global data to store history table counter
const globalData = require('./models/GlobalData');
app.global = new globalData('./data/global.json');
app.global.initialize(true);
module.exports = app;


//starting the server on port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`[SERVER] Server is listening on port ${PORT}.`);
});