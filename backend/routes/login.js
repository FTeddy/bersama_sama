const express = require('express')
const router = express.Router()

const {loginFB} = require('../controllers/login.controller')

router.post('/', loginFB)

module.exports = router
