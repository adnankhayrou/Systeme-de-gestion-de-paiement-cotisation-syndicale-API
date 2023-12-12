const Apartment = require("../models/apartmentModel");

const createNewApartment = async (req, res) => {
    try {
        const check = await Apartment.find({resident_cin: req.body.resident_cin})
        if (check.length > 0) {
            return res.status(404).json({ error: "Apartment Already Exist"});
        }
        const apartment = await Apartment.create(req.body);
        res.json({ success: "Apartment created successfully", apartment });

    } catch (e) {
        console.log(e);
        res.status(400).json({ error: "Something went wrong" });
    }
};

const getApartmentWithId = async (req, res) => {
    const { id } = req.params;
    try {
        const apartment = await Apartment.findById(id);
        if (!apartment) {
            return res.status(404).json({ error: "Apartment not found" });
        }
        res.json({success: "Apartment found successfully", data: apartment,});
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: "Something went wrong" });
    }
};

const getApartmentWithUserId = async (req, res) => {
    const { user_id } = req.params;

    try {
        const apartments = await Apartment.find({ user_id: user_id });

        if (apartments.length === 0) {
            return res.status(404).json({ error: "No apartments found for this user" });
        }

        res.json({ success: "Apartments found successfully", apartments });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Something went wrong" });
    }
};





module.exports = {
    createNewApartment,
    getApartmentWithId,
    getApartmentWithUserId,
};