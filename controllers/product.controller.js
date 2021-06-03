const Product = require('../models/Product');
const { body, validationResult} = require('express-validator');
const db = require('../db/index');
const { Op } = require('sequelize');
const sequelize = require('../db/index');

exports.findAll = async (req, res) => {
    const name = req.query.name;
    //var condition = name ? { name: { [Op.like]: `%${name}%`}} : null;

    try {
        const products= name ? (await sequelize.query(`SELECT * FROM public."Product" 
                                                        WHERE LOWER(name) LIKE '%${name}%'`))[0] : 
                                await Product.findAll({
                                        order: [
                                            ['name', 'ASC']
                                        ]
        });
        res.send(products);
    }
    catch(err) {
        console.log(err);
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
        console.log(err);
        res.status(500).send({
            message: 
                err.message || 'An error occured while retrieving the reqested product.'
            });
    }
}

exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('error');
      return res.status(400).json({ errors: errors.array() });
    }

    let product = {
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
        console.log(err);
        res.status(500).send({
            message:
                err.message || 'An error occured while creating a product.'
        });
    }
}

exports.update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('error');
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    let product = {
        name: req.body.name,
        price: req.body.price,
        ingredients: req.body.ingredients,
        calories: req.body.calories,
        quantity: req.body.quantity,
        url: req.body.url
    };

    try {
        product = await Product.update(product, {
            where: {
                id: id
            }
        });
        res.send(product);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            message:
                err.message || 'An error occures while updating a product.'
        });
    }    
}

exports.deleteAll = async (req, res) => {
    try {
        await Product.destroy({
            truncate: true
        });
        res.status(200).send();
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            message:
                err.message || 'An error occured while deleting all products.'
        });
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        await Product.destroy({
            where: {
                id: id
            }
        });
        res.status(200).send();
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            message:
                err.message || 'An error occured while deleting a product.'
        });
    }

}