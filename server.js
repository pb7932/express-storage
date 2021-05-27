const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

const productRouter = require('./routes/product.routes');

app.use('/api/products', productRouter);

const PORT = pocess.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Serever is listening on port ${PORT}`);
});