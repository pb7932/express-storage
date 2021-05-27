const express = require('express');
const router = express.Router();
const products = require('../controllers/product.controller');

router.get('/', products.findAll);

router.get('/:id', products.findById);

router.get('/name', product.findByName);

router.post('/', products.create);

router.put('/:id', products.update);

router.delete('/', products.deleteAll);

router.delete('/:id', products.delete);



module.exports = router;
