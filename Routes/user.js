const express = require('express');
const appusers = require('../models/user');
const jwt = require('jsonwebtoken');
const cryptcode = require('bcrypt');
const router = express.Router();



// code for create account

router.post('/createaccount', (req, res, next) => {
    cryptcode.hash(req.body.password, 10).then(hash => {
        const users = new appusers({
            email: req.body.email,
            password: hash
        });
        appusers.findOne({ email: req.body.email }).then(userfound => {
            if (userfound) {
                console.log('user email alreadt exist');
                return res.status(401).json({
                    message: 'User email is already exist'
                })
            }
            users.save().then(result => {
                if (!result) {
                    return res.status(500).json({
                        message: 'error occured while creating a account'
                    })
                }
                res.status(200).json({
                    message: 'new user created successfully',
                    result: result
                });
            }).catch(err => {
                res.status(500).json({
                    error: err
                })
            })
        })
    })
});

// code for login

router.post('/login', (req, res, next) => {
    let fetchedUser;
    appusers.findOne({ email: req.body.email }).then(logindetails => {
        if (!logindetails) {
            return res.status(401).json({
                message: 'Login process failed please check entered email'
            })
        }
        fetchedUser = logindetails;
        return cryptcode.compare(req.body.password, logindetails.password);
    }).then(result => {
        console.log(fetchedUser);
        if (!result) {
            return res.status(401).json({
                message: 'Login process failed please check entered password'
            })
        }
        const token = jwt.sign({
            email: fetchedUser.email, userid: fetchedUser._id
        }, "Kepp this as secret this will expired after one hour",
            { expiresIn: '1hr' });
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            userid: fetchedUser._id,
            message: 'hello user logged in successfully'
        })
    }).catch(err => {
        console.log(err);
    })
})
module.exports = router