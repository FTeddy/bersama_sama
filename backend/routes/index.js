const express = require('express');
const router = express.Router();
const {authlogin} = require('../middleware/auth')
const {getUserDetail} = require('../controllers/user.controller');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
