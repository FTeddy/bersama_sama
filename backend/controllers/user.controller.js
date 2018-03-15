const User = require('../models/user.model');

module.exports = {
    getUserDetail: (req, res) => {
        User.findOne({_id: req.params.id})
            .exec()
            .then(data => {
                res.status(200).json({
                    message: 'Success',
                    data: data
                })
            })
    }
}
