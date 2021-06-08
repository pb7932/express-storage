const express = require('express');
const router = express.Router();
const history = require('../controllers/history.controller');

router.get('/', history.createHistory);

router.get('/init', history.initCounter);

module.exports = router;