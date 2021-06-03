const express = require('express');
const { body, validationResult} = require('express-validator');
const router = express.Router();
const products = require('../controllers/product.controller');

router.get('/', products.findAll);

router.get('/:id', products.findById);

router.post('/',
        body('name').not().isEmpty().isAlpha().isLength({min: 2, max: 50}),
        body('price').not().isEmpty().isNumeric(),
        body('ingredients').not().isEmpty().isLength({min:2, max: 100}),
        body('calories').not().isEmpty().isNumeric(),
        body('quantity').not().isEmpty().isNumeric(),
        body('url').not().isEmpty().isURL(),
        products.create);

router.put('/:id',
        body('name').not().isEmpty().isAlpha().isLength({min: 2, max: 50}),
        body('price').not().isEmpty().isNumeric(),
        body('ingredients').not().isEmpty().isLength({min:2, max: 100}),
        body('calories').not().isEmpty().isNumeric(),
        body('quantity').not().isEmpty().isNumeric(),
        body('url').not().isEmpty().isURL(), 
        products.update);

router.delete('/', products.deleteAll);

router.delete('/:id', products.delete);

module.exports = router;
