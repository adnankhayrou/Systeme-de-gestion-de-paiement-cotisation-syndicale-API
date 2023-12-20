const userModel = require('../models/userModel')
const bcryptjs = require('bcryptjs');
const sendMailToUser = require('../mailer/mailToUser');
const { authRequest } = require('../requests/auth.request');
const tokenRequest = require('../requests/token.request');
const {emailAndPasswordRequest} = require('../requests/emailAndPassword.request');
const jwt = require('jsonwebtoken');
require('dotenv').config();


async function register (req, res) {
    const {error} = authRequest.RegisterValidation(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const emailExists = await userModel.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).json({ error: 'This Email is already exists Try To Sign in' });
    }

    const genSalt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, genSalt);

    const newUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });
    try {
        const saveUser = await newUser.save();
        let userData = { ...saveUser._doc };
        delete userData.password;

        const token = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m'});
        const tokenWithHyphens = token.replace(/\./g, '~');

        let mailType = {
            from: 'Allo.Media@livraison.com',
            to: req.body.email,
            subject: 'Account activation link',
            html: `<div class="con">
            <h2>Hello ${req.body.name}</h2>
            <h3> Click the link to activate your account </h3>
            <a class="btn" href="http://localhost:5173/verifyEmail/${tokenWithHyphens}">Active Your Account</a>
            </div>
                <style>
                    .con{
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        justify-content: center;
                        height: 100vh;
                    }
                    .btn{
                        background-color: #4CAF50;
                        font-size: 16px;
                        font-weight: bold;
                        border-radius: 30px;
                        border-width: 0;
                        margin-top: 15px;
                        padding: 10px 32px;
                        color: white;
                        text-decoration: none; 
                    }
                </style>`,
            };
        sendMailToUser(mailType);

        res.status(200).json({ success: 'Registration Successfully, Please Verify Your Email', newUser: userData });
    } catch (err) {
        return res.status(400).send(err);
    }

}

async function verifyEmail (req, res) {
    const token = req.params.token;
    if(!token) return res.status(401).json({ error: `Don't have access` });
    const decoded_user = tokenRequest(token);

    if(!decoded_user.success){
        return res.status(401).json({ error: `Don't have access` })
    }

    const _id = decoded_user.data._id;

    try {
        await userModel.updateOne({ _id }, { is_verified: true });
        res.status(200).json({ success: 'Your Account activated successfully' });
    }catch (e) {
        console.log(e);
        res.status(400).json({ error: 'Something is wrong' });
    }

}

async function login(req, res){
    const {error} = authRequest.LoginValidation(req.body);
    if (error){
        return res.status(400).json({ error: error.details[0].message });
    } 

    const user = await userModel.findOne({ email: req.body.email })


    if (!user){
        return res.status(400).json({ error: 'This Email is not found' });
    }

    const validPass = await bcryptjs.compare(req.body.password, user.password);
    if (!validPass){
        return res.status(400).json({ error: 'Invalid password' });
    }

    if(!user.is_verified){
        return res.status(400).json({ error: 'Please verify your email' });
    } 

    const token = jwt.sign({ user}, process.env.ACCESS_TOKEN_SECRET);

    res.cookie('authToken', token, { httpOnly: true });
   
    res.json({ success: "Login Successfull", user, token})
}

function logout(req, res){
    res.clearCookie('authToken');
    res.status(200).json({ success: 'You are Logged out successfully' });
}

async function forgotPassword(req, res){
    const {error} = emailAndPasswordRequest.EmailValidation(req.body);
    if (error) return res.status(400).json({ error: 'email must be a valid email' });

    const user = await userModel.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ error: 'This Email is not found' });

    try{
        let payload = {
            _id : user._id,
            name: user.name,
            email: user.email,
        }
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m'});
        const tokenWithHyphens = token.replace(/\./g, '~');
        let mailType = {
            from: 'Allo.Media@livraison.com',
            to: req.body.email,
            subject: 'Reset your password',
            html: `<div class="con">
            <h3> Click the link to reset your password </h3>
            <a class="btn" href="http://localhost:5173/resetPassword/${tokenWithHyphens}">Reset Your Password</a>
            </div>
                <style>
                    .con{
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        justify-content: center;
                        height: 100vh;
                    }
                    .btn{
                        background-color: #4CAF50;
                        font-size: 16px;
                        font-weight: bold;
                        border-radius: 30px;
                        border-width: 0;
                        margin-top: 15px;
                        padding: 10px 32px;
                        color: white;
                        text-decoration: none; 
                    }
                </style>`,
        };
        sendMailToUser(mailType);

        res.status(200).json({ success: 'Please Check Email to Reset Your Password ' });
    }catch (e){
        console.log(e);
        res.status(400).json({ error: 'Something went wrong' });
    }
}

async function resetPassword(req, res) {
    const user = req.user;
    const { error } = emailAndPasswordRequest.PasswordValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const genSalt = await bcryptjs.genSalt(10);
        const hashingPassword = await bcryptjs.hash(req.body.password, genSalt);
        const result = await userModel.updateOne(
            { _id: user._id },
            { password: hashingPassword }
        );

        res.status(200).json({ success: 'Your Password reseted successfully' });
      
    } catch (error) {
        return res.status(400).json({ error: "Something Went Wrong" });
    }
}

async function getUser(req, res){
    const user = await userModel.findOne(
        {email : req.params.formData }
    )
    res.status(200).json({success: 'your user', user})
    console.log(user);
}

module.exports = {
    register,
    verifyEmail,
    login,
    logout,
    resetPassword,
    forgotPassword,
    getUser
}