const express = require('express')
const memUpload = require('../middleware/multer')
const {googleUpload, googleDelete}
const router = express.Router()

const {create, findAll, findById, like, destroy, findOneAndNext} = require('../controllers/file.controller')

// TODO change memUpload argument to form input name
router.post('/create/:facebookId', memUpload.single('image'), googleUpload, create);
router.get('/', findAll);
router.get('/:id', findById);
router.put('/:fileId/:userid', like);
router.delete('/delete/:fileId', findOneAndNext, googleDelete, destroy);

module.exports = router
