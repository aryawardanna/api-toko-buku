const express = require('express');
const router = express.Router();
const { auth } = require('../../middlewares/auth');
const controller = require('./controller');

router.get('/books', auth, controller.getAllBooks);

module.exports = router;
