const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/paymentController');


router.post('/createPayment', paymentController.createNewPayment);
// router.get('/getApartment/:id', paymentController.getApartmentWithId);
// router.get('/getUserApartments/:user_id', paymentController.getApartmentWithUserId);
// router.post('/deleteApartment/:id', paymentController.deleteApartment);
// router.post('/updateApartment/:id', paymentController.updateApartment);

module.exports = router;