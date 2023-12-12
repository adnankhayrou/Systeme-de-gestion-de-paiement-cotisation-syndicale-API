const express = require('express')
const router = express.Router()
const apartmentController = require('../controllers/apartmentController');
// const isLogged = require('../middlewares/isLogged.meddleware');


router.post('/createApartment', apartmentController.createNewApartment);

module.exports = router;