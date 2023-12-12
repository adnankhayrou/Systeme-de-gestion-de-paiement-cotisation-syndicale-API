const Apartment = require("../models/apartmentModel");

const createNewApartment = async (req, res) => {
    try {
        const apartment = await Apartment.create(req.body);
        res.json({ success: "Apartment created successfully", apartment });
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: "Something went wrong" });
    }
};




module.exports = {
    createNewApartment,
};