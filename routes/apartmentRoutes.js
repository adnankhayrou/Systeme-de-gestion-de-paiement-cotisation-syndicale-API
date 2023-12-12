const express = require('express')
const router = express.Router()
const apartmentController = require('../controllers/apartmentController');


router.post('/createApartment', apartmentController.createNewApartment);
router.get('/getApartment/:id', apartmentController.getApartmentWithId);
router.get('/getUserApartments/:user_id', apartmentController.getApartmentWithUserId);
router.post('/deleteApartment/:id', apartmentController.deleteApartment);
router.post('/updateApartment/:id', apartmentController.updateApartment);

module.exports = router;