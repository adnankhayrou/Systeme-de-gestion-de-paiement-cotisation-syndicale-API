const express = require('express')
const router = express.Router()
const apartmentController = require('../controllers/apartmentController');


router.post('/createApartment', apartmentController.createNewApartment);
router.get('/getApartment/:id', apartmentController.getApartmentWithId);

module.exports = router;