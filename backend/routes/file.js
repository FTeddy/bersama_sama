const express = require('express')
const router = express.Router()

const {create, findAll, findById, like, destroy} = require('../controllers/file.controller')

router.post('/create/:userId', create);
router.get('/', findAll);
router.get('/:id', findById);
router.put('/:fileId/:userid', like);
router.delete('/:id', destroy);

module.exports = router
