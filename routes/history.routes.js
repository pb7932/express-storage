const express = require('express');
const router = express.Router();
const history = require('../controllers/history.controller');

router.get('/', history.getHistory);

router.get('/init', history.initCounter);

router.post('/', history.createHistory);

router.get('/:date', history.getHistoryByDate);

module.exports = router;