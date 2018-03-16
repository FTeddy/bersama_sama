const User = require('../models/user.model');
const Files = require('../models/file.model');

module.exports = {
    create: (req, res) => {
        User.findOne({facebookId: req.params.facebookId})
          .exec()
          .then(foundUser => {
            let file = {
                filePath: req.file.imgUrl,
                mimeType: req.file.mimetype,
                userId: foundUser._id,
            }

            Files.create(file, (err, data) => {
                // update user here
                foundUser.files.push(data._id);
                foundUser.save().then((User) => {
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

            })
          })
          .catch(err => {
            res.status(500).json({
              message: 'Server error',
              err: err
            })
          })
    },
    findAll: (req, res) => {
        Files.find()
            .populate('user')
            .populate('likes')
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
            .populate('user')
            .populate('likes')
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
      const id = req.params.fileId
      Files.remove({ _id: id }, (err, data) => {
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
        const id = req.params.fileId
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
    },

    verifyUser: (req, res, next) => {
      const email = req.decoded.email;
      User.findOne({email : email})
        .exec().then(foundUser => {
          if (foundUser) {
            next()
          } else {
            res.status(401).json({
              message: 'User is not authorized to post here.'
            })
          }
        })
        .catch(err => {
          res.status(500).json({
            message: 'Server Error',
            err: err
          })
        })
    }
}
