const express = require('express');
const router = express.Router();
const history = require('../controllers/history.controller');

router.get('/', history.getHistory);

router.post('/', history.createHistory);

router.get('/delete', history.initHistoryState);

router.get('/init', history.initCounter);

router.get('/:date', history.getHistoryByDate);

module.exports = router;