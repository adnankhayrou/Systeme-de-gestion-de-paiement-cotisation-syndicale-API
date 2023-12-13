const Payment = require("../models/paymentModel");
// const Apartment = require("../models/apartmentModel");

const createNewPayment = async (req, res) => {
    try {
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        const {user_id, payment, apartment_id } = req.body;
        
        const newPayment = await Payment.create({user_id: user_id, payment, apartment_id: apartment_id, month, year});
        res.json({ success: "Payment created successfully", newPayment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }   
};

module.exports = {
    createNewPayment,
};