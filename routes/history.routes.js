const express = require('express');
const router = express.Router();
const history = require('../controllers/history.controller');

router.get('/', history.getHistory);

router.get('/init', history.initCounter);

router.post('/', history.createHistory);

module.exports = router;