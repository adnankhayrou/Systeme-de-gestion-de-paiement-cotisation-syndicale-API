const Payment = require("../models/paymentModel");
const Apartment = require("../models/apartmentModel");

const createNewPayment = async (req, res) => {
    try {
        const today = new Date();
        const month = today.getMonth()+1;
        const year = today.getFullYear();
        const {user_id, payment, apartment_id } = req.body;
        
        const newPayment = await Payment.create({user_id: user_id, payment, apartment_id: apartment_id, month, year});
        res.json({ success: "Payment created successfully", newPayment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }   
};

const getAllPayments = async (req, res) => {
    const { user_id } = req.params;
    console.log(user_id);
    try {
        const apartments = await Apartment.find({ user_id: user_id });
        console.log(apartments);
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        
        const AlreadyPaidApartments = await Payment.find({user_id: user_id, month,year,
            apartment: { $in: apartments.map((apartment) => apartment._id) },
        }).populate("apartment");

        const AlreadyPaidApartmentIds = AlreadyPaidApartments.map((payment) => payment.apartment._id);
        const unpaidApartments = apartments.filter((apartment) => !AlreadyPaidApartmentIds.includes(apartment._id));

        res.json({ AlreadyPaidApartments,  unpaidApartments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
};


module.exports = {
    createNewPayment,
    getAllPayments,
};