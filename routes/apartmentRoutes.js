const express = require('express')
const router = express.Router()
const apartmentController = require('../controllers/apartmentController');


router.post('/createApartment', apartmentController.createNewApartment);
router.get('/getApartment/:id', apartmentController.getApartmentWithId);
router.get('/getUserApartments/:user_id', apartmentController.getApartmentWithUserId);
router.post('/deleteApartment/:id', apartmentController.deleteApartment);
router.post('/updateApartment/:id', apartmentController.updateApartment);


/**
 * @swagger
 * paths:
 *   /api/apartment/createApartment:
 *     post:
 *       summary: Create a new apartment
 *       tags:
 *         - Apartment
 *       requestBody:
 *         description: Apartment details
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resident_cin:
 *                   type: string
 *                   description: The resident's ID or unique identifier
 *                   example: "123456789"
 *                 apartment_number:
 *                   type: string
 *                   description: The apartment number
 *                   example: "A102"
 *                 resident_name:
 *                   type: string
 *                   description: The name of the resident
 *                   example: "John Doe"
 *               required:
 *                 - resident_cin
 *                 - apartment_number
 *                 - resident_name
 *       responses:
 *         '200':
 *           description: Successful creation of the apartment
 *           content:
 *             application/json:
 *               example:
 *                 success: "Apartment created successfully"
 *                 apartment:
 *                   _id: "123456789"
 *                   resident_cin: "123456789"
 *                   apartment_number: "A102"
 *                   resident_name: "John Doe"
 *         '400':
 *           description: Bad request or validation error
 *           content:
 *             application/json:
 *               example:
 *                 error: "Something went wrong"
 *         '404':
 *           description: Apartment already exists
 *           content:
 *             application/json:
 *               example:
 *                 error: "Apartment Already Exist"
 */


/**
 * @swagger
 * paths:
 *   /api/apartment/getApartment/{id}:
 *     get:
 *       summary: Get apartment details by ID
 *       tags:
 *         - Apartment
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The ID of the apartment to retrieve
 *           schema:
 *             type: string
 *             example: 123456789
 *       responses:
 *         '200':
 *           description: Successful retrieval of apartment details
 *           content:
 *             application/json:
 *               example:
 *                 success: "Apartment found successfully"
 *                 data:
 *                   _id: "123456789"
 *                   resident_cin: "123456789"
 *                   apartment_number: "A102"
 *                   resident_name: "John Doe"
 *         '400':
 *           description: Bad request or validation error
 *           content:
 *             application/json:
 *               example:
 *                 error: "Something went wrong"
 *         '404':
 *           description: Apartment not found
 *           content:
 *             application/json:
 *               example:
 *                 error: "Apartment not found"
 */


/**
 * @swagger
 * paths:
 *   /api/apartment/getUserApartments/{user_id}:
 *     get:
 *       summary: Get apartments for a user by user ID
 *       tags:
 *         - Apartment
 *       parameters:
 *         - in: path
 *           name: user_id
 *           required: true
 *           description: The ID of the user to retrieve apartments for
 *           schema:
 *             type: string
 *             example: 123456789
 *       responses:
 *         '200':
 *           description: Successful retrieval of user's apartments
 *           content:
 *             application/json:
 *               example:
 *                 success: "Apartments found successfully"
 *                 apartments:
 *                   - _id: "123456789"
 *                     resident_cin: "123456789"
 *                     apartment_number: "A102"
 *                     resident_name: "John Doe"
 *                   - _id: "987654321"
 *                     resident_cin: "987654321"
 *                     apartment_number: "B203"
 *                     resident_name: "Jane Doe"
 *         '404':
 *           description: No apartments found for this user
 *           content:
 *             application/json:
 *               example:
 *                 error: "No apartments found for this user"
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
 *   /api/apartment/deleteApartment/{id}:
 *     post:
 *       summary: Delete an apartment by ID
 *       tags:
 *         - Apartment
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The ID of the apartment to delete
 *           schema:
 *             type: string
 *             example: 123456789
 *       responses:
 *         '200':
 *           description: Successful deletion of the apartment
 *           content:
 *             application/json:
 *               example:
 *                 success: "Apartment deleted successfully"
 *                 deletedApartment:
 *                   _id: "123456789"
 *                   resident_cin: "123456789"
 *                   apartment_number: "A102"
 *                   resident_name: "John Doe"
 *         '400':
 *           description: Bad request or validation error
 *           content:
 *             application/json:
 *               example:
 *                 error: "Something went wrong"
 *         '404':
 *           description: Apartment not found
 *           content:
 *             application/json:
 *               example:
 *                 error: "Apartment not found"
 */


/**
 * @swagger
 * paths:
 *   /api/apartment/updateApartment/{id}:
 *     post:
 *       summary: Update an apartment by ID
 *       tags:
 *         - Apartment
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The ID of the apartment to update
 *           schema:
 *             type: string
 *             example: 123456789
 *       requestBody:
 *         description: Updated apartment details
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resident_cin:
 *                   type: string
 *                   description: The resident's ID or unique identifier
 *                   example: "123456789"
 *                 apartment_number:
 *                   type: string
 *                   description: The apartment number
 *                   example: "A102"
 *                 resident_name:
 *                   type: string
 *                   description: The name of the resident
 *                   example: "John Doe"
 *               required:
 *                 - resident_cin
 *                 - apartment_number
 *                 - resident_name
 *       responses:
 *         '200':
 *           description: Successful update of the apartment
 *           content:
 *             application/json:
 *               example:
 *                 success: "Apartment updated successfully"
 *                 updatedApartment:
 *                   _id: "123456789"
 *                   resident_cin: "123456789"
 *                   apartment_number: "A102"
 *                   resident_name: "John Doe"
 *         '400':
 *           description: Bad request or validation error
 *           content:
 *             application/json:
 *               example:
 *                 error: "Something went wrong"
 *         '404':
 *           description: Apartment not found
 *           content:
 *             application/json:
 *               example:
 *                 error: "Apartment not found"
 */

module.exports = router;