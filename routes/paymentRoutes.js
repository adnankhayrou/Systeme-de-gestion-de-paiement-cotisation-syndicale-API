const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/paymentController');


router.post('/createPayment', paymentController.createNewPayment);
router.get('/getAllPayments/:user_id', paymentController.getAllPayments);
router.get('/getResidentPayment/:payment_id', paymentController.getResidentPayment);



/**
 * @swagger
 * paths:
 *   /api/payment/createPayment:
 *     post:
 *       summary: Create a new payment
 *       tags:
 *         - Payment
 *       requestBody:
 *         description: Payment details
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                   description: The ID of the user making the payment
 *                   example: 123456
 *                 payment:
 *                   type: number
 *                   description: The payment amount
 *                   example: 100.00
 *                 apartment:
 *                   type: object
 *                   properties:
 *                     apartment_number:
 *                       type: string
 *                       description: The apartment number
 *                       example: "A102"
 *                     resident_name:
 *                       type: string
 *                       description: The name of the resident
 *                       example: "John Doe"
 *                   required:
 *                     - apartment_number
 *                     - resident_name
 *               required:
 *                 - user_id
 *                 - payment
 *                 - apartment
 *       responses:
 *         '200':
 *           description: Successful payment creation
 *           content:
 *             application/json:
 *               example:
 *                 success: "Payment Done"
 *                 newPayment:
 *                   _id: "123456789"
 *                   user_id: "123456"
 *                   payment: 100.00
 *                   apartment:
 *                     apartment_number: "A102"
 *                     resident_name: "John Doe"
 *                   month: 1
 *                   year: 2023
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               example:
 *                 error: "Something went wrong"
 */


/**
 * @swagger
 * paths:
 *   /api/payment/getAllPayments/{user_id}:
 *     get:
 *       summary: Get all payments for a user
 *       tags:
 *         - Payment
 *       parameters:
 *         - in: path
 *           name: user_id
 *           required: true
 *           description: The ID of the user to get payments for
 *           schema:
 *             type: string
 *             example: 123456
 *       responses:
 *         '200':
 *           description: Successful retrieval of payments
 *           content:
 *             application/json:
 *               example:
 *                 AlreadyPaidApartments:
 *                   - _id: "123456789"
 *                     user_id: "123456"
 *                     payment: 100.00
 *                     apartment:
 *                       _id: "987654321"
 *                       apartment_number: "A102"
 *                       resident_name: "John Doe"
 *                   - _id: "987654321"
 *                     user_id: "123456"
 *                     payment: 75.00
 *                     apartment:
 *                       _id: "123456789"
 *                       apartment_number: "B203"
 *                       resident_name: "Jane Doe"
 *                 unpaidApartments:
 *                   - _id: "456789123"
 *                     apartment_number: "C304"
 *                     resident_name: "Alice Doe"
 *                   - _id: "789123456"
 *                     apartment_number: "D405"
 *                     resident_name: "Bob Doe"
 *                 apartments:
 *                   - _id: "123456789"
 *                     apartment_number: "A102"
 *                     resident_name: "John Doe"
 *                   - _id: "987654321"
 *                     apartment_number: "B203"
 *                     resident_name: "Jane Doe"
 *                   - _id: "456789123"
 *                     apartment_number: "C304"
 *                     resident_name: "Alice Doe"
 *                   - _id: "789123456"
 *                     apartment_number: "D405"
 *                     resident_name: "Bob Doe"
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               example:
 *                 error: "Something went wrong"
 */


/**
 * @swagger
 * paths:
 *   /api/payment/getResidentPayment/{payment_id}:
 *     get:
 *       summary: Get resident payment details by payment ID
 *       tags:
 *         - Payment
 *       parameters:
 *         - in: path
 *           name: payment_id
 *           required: true
 *           description: The ID of the payment to retrieve resident details
 *           schema:
 *             type: string
 *             example: 123456789
 *       responses:
 *         '200':
 *           description: Successful retrieval of resident payment details
 *           content:
 *             application/json:
 *               example:
 *                 residentPayment:
 *                   - _id: "123456789"
 *                     user_id: "123456"
 *                     apartment:
 *                       _id: "987654321"
 *                       apartment_number: "A102"
 *                       resident_name: "John Doe"
 *                   - _id: "987654321"
 *                     user_id: "123456"
 *                     apartment:
 *                       _id: "123456789"
 *                       apartment_number: "B203"
 *                       resident_name: "Jane Doe"
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               example:
 *                 error: "Something went wrong"
 */

module.exports = router;