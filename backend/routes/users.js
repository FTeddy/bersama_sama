const express = require('express')
const router = express.Router()

const {getUserDetail} = require('../controllers/user.controller')

router.post('/:id', getUserDetail)

module.exports = router
