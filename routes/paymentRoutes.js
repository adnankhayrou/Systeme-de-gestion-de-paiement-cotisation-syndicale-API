const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/paymentController');


router.post('/createPayment', paymentController.createNewPayment);
router.get('/getAllPayments/:user_id', paymentController.getAllPayments);


module.exports = router;