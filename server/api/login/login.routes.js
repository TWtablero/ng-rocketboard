'use strict';

var express = require('express');
var controller = require('./login.controller');

var router = express.Router();

router.get('/', controller.login);
router.get('/token', controller.loginToken);
router.delete('/', controller.logout);

module.exports = router;