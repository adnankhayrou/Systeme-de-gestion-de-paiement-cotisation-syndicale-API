const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController');
const tokenMeddleware = require('../middlewares/token.meddleware');
const isLogged = require('../middlewares/isLogged.meddleware');
const isLogout = require('../middlewares/isLoggetOut.meddleware');


router.post('/register',isLogged, authController.register);
router.get('/verification/:token', authController.verifyEmail);
router.post('/login',isLogged, authController.login);
router.get('/logout',isLogout, authController.logout);
router.post('/forgotpassword',authController.forgotPassword);
router.post('/resetpassword/:token',tokenMeddleware, authController.resetPassword);
router.get('/GetUser/:formData',isLogout, authController.getUser);



// register end point swagger
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: User registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               name: John Doe
 *               email: john@example.com
 *               password: password123
 *     responses:
 *       '200':
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                 newUser:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                   example:
 *                     name: John Doe
 *                     email: john@example.com
 *       '400':
 *         description: Bad request or user already exists
 *       '401':
 *         description: Unauthorized
 */



// verification end point swagger
/**
 * @swagger
 * /api/auth/verification/{token}:
 *   get:
 *     summary: Verify user email
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token received in the verification link
 *     responses:
 *       '200':
 *         description: Account successfully activated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                      
 *       '401':
 *         description: Unauthorized or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */


// login end point swagger
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User login details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: john@example.com
 *               password: password123
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                 user:
 *                   type: object
 *                 token:
 *                   type: string
 *                  
 *       '400':
 *         description: Invalid email, password, or unverified email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */



// logout end point swagger
/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: User logout
 *     tags:
 *       - Authentication
 *     responses:
 *       '200':
 *         description: User successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 */



// forgot password end point swagger
/**
 * @swagger
 * /api/auth/forgotpassword:
 *   post:
 *     summary: Forgot Password
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: Email to reset password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             example:
 *               email: john@example.com
 *     responses:
 *       '200':
 *         description: Email sent for password reset
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *       '400':
 *         description: Invalid email or something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */



// reset password end point swagger
/**
 * @swagger
 * /api/auth/resetpassword/{token}:
 *   post:
 *     summary: Reset Password
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token for password reset
 *     requestBody:
 *       description: New password for reset
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *             example:
 *               password: newpassword123
 *     responses:
 *       '200':
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *       '400':
 *         description: Invalid password or something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */



module.exports = router;