const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports = {
    loginFB: (req, res) => {
        const idFB = req.body.idFB
        const email = req.body.email
        const fbToken = req.body.fbToken

        User.findOne({ 'email': email })
            .exec()
            .then(dataUser => {
                if (dataUser) {
                    const token = jwt.sign({ email: dataUser.email, fbToken: fbToken }, 'secret-ui')
                    res.status(200).json({
                        dataUser,
                        token: token
                    })
                } else {
                    const newUser = new User({
                        email: email,
                        facebookId: idFB
                    })
                    newUser.save((err, data) => {
                        const token = jwt.sign({ email: dataUser.email, fbToken: fbToken }, 'secret-ui')
                        res.status(200).json({
                            token: token,
                            dataUser: data
                        })
                    })
                }
            })
    }
}

