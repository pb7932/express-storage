const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const {sequelize} = require('./db/index');
const seed = require('./db/seed');

sequelize.authenticate().then(console.log('[DB] Authentication completed.'));
//seed().then(console.log('[DB] Seed completed.'));

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

const productRouter = require('./routes/product.routes');
const historyRouter = require('./routes/history.routes');

app.use('/api/products', productRouter);
app.use('/api/history', historyRouter);
app.get('/', (req,res) => {
    res.send('Welcome to my server!');
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`[SERVER] Server is listening on port ${PORT}.`);
});