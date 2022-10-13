const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtkey = "jwt";

//Create User
exports.createUser = async (req, res) => {
    try {
        req.body.status = 1;
        const newuser = new User(req.body);
        const user = await newuser.save();
        //Response Data 
        res.status(201).json({
            status: "success",
            data: {
                user: user,
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        });
    }
}

//single User List
exports.getUser = async (req, res) => {
    try {

        const getuser = await User.find({ _id: req.params.id });
        if (getuser.length > 0) {
            res.status(200).json({
                status: "success",
                data: {
                    user: getuser
                }
            })
        } else {
            res.status(404).json({
                status: 'failed',
                message: "Id Not Found!!!"
            });
        }

    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err
        })
    }
}

//User Login
exports.userLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        var userdata = await User.find({ $and: [{ email: email }] });

        if (userdata.length > 0) {

            const isMatch = await bcrypt.compare(password, userdata[0].password);
            delete(userdata[0].password);
            const token = jwt.sign(userdata[0].toJSON(),
                jwtkey, {
                expiresIn: '300m'
            });
            data = {
                'accessToken': 'Bearer ' + token,
            };
            if (isMatch) {
                res.status(201).json({
                    status: "success",
                    data: data
                })
            }
            else {
                res.status(400).json({
                    status: "failed",
                    message: 'invalid password details!!'
                })
            }

        }
        else {
            res.status(400).json({
                status: "failed",
                message: 'Not varified your email Or Deactive Your Record!!'
            })
        }


    }
    catch (err) {
        res.status(400).json({
            status: "failed",
            message: err
        })
    }
}








