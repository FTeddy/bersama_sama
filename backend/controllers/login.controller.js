const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports = {
    loginFB: (req, res) => {
        const idFB = req.body.idFB;
        const email = req.body.email;
        const fbToken = req.body.fbToken;
        const imgUrl = req.body.imgUrl;
        const username = req.body.username;
        User.findOne({ 'email': email })
            .exec()
            .then(dataUser => {
                if (dataUser) {
                    User.update({'email': email}, { $set: { profilImg:  imgUrl}}, (err, data)=>{
                        if(err){
                            return res.status(500).json({
                                message: 'Server error',
                                err: err
                            })
                        }
                    })
                    const token = jwt.sign({ email: dataUser.email, fbToken: fbToken }, 'secret-ui')
                    res.status(200).json({
                        dataUser,
                        token: token
                    })
                } else {
                    const newUser = new User({
                        email: email,
                        facebookId: idFB,
                        imgUrl: imgUrl,
                        username: username
                    })
                    newUser.save((err, data) => {
                        const token = jwt.sign({ email: email, fbToken: fbToken }, 'secret-ui')
                        res.status(200).json({
                            token: token,
                            dataUser: data
                        })
                    })
                }
            })
    }
}

