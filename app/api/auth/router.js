const express = require('express');
const router = express.Router();
const controller = require('./controller');

/* GET home page. */
router.post('/auth/signin', controller.signin);
router.post('/auth/signup', controller.signup);

module.exports = router;
