const User = require('../models/user.model');
const Files = require('../models/file.model');

module.exports = {
    create: (req, res) => {
        let file = {
            filePath: req.file.imgUrl,
            mimeType: req.file.mimetype,
            userId: req.params.userId,
        }
        Files.create(file, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: err.message
                })
            }
            res.status(200).json({
                message: 'New file inserted',
                data
            })
        })
    },
    findAll: (req, res) => {
        Files.find()
            .exec()
            .then((data) => {
                res.status(200).json({
                    message: 'Success get all data !',
                    data
                })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({
                    message: err.message
                })
            })
    },
    findById: (req, res) => {
        Files.findOne({
            _id: req.params.id
        })
            .exec()
            .then((data) => {
                res.status(200).json({
                    message: 'Success get data !',
                    data
                })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({
                    message: err.message
                })
            })
    },
    like: (req, res) => {
        Files.findOne({ _id: req.params.fileId })
            .exec()
            .then((data) => {
                let updateLike = data.like;
                updateLike.push(req.params.userid);
                Files.findByIdAndUpdate(req.params.fileId, {
                    like: updateLike
                }, { new: true }, (err, data2) => {
                    if (err) {
                        return res.status(400).json({
                            message: 'Failed to update'
                        })
                    }
                    res.status(200).json({
                        message: 'Updated',
                        data: data2
                    })
                })
            })
    },
    destroy: (req, res) => {
        Files.remove({ _id: req.params.id }, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: err.message
                })
            }
            res.status(200).json({
                message: 'Item deleted',
            })
        })
    },

    findOneAndNext: (req, res, next) => {
        const id = req.params.id
        Files.findOne({_id:id})
          .exec()
          .then(foundFile => {
            req.toDelete = foundFile;
            next()
          })
          .catch(err => {
            res.status(404).json({
              message: 'File not found.',
              err: err
            })
          })
    }
}
