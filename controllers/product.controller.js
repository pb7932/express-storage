const Product = require('../models/Product');
const db = require('../db/index');

exports.findAll = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.send(products);
    }
    catch(err) {
       res.status(500).send({
           message: 
                err.message || 'An error occured while retrieving products.'
       });
    }
}

exports.findById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByPk(id);
        res.send(product);
    }
    catch (err) {
        res.status(500).send({
            message: 
                err.message || 'An error occured while retrieving the reqested product.'
            });
    }
}

exports.create = async (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
        ingredients: req.body.ingredients,
        calories: req.body.calories,
        quantity: req.body.quantity,
        url: req.body.url
    };

    console.log(product);

    try {
        product = await Product.create(product);
        res.send(product);
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || 'An error occured while creating a product.'
        });
    }
}