const Payment = require("../models/paymentModel");
const Apartment = require("../models/apartmentModel");


const createNewPayment = async (req, res) => {
    console.log('here',req.body);
    try {
        const today = new Date();
        const month = today.getMonth()+1;
        const year = today.getFullYear();
        const {user_id, payment, apartment } = req.body;
        
        const newPayment = await Payment.create({user_id: user_id, payment, apartment: apartment, month, year});
        res.json({ success: "Payment Done", newPayment });
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
        

        const AlreadyPaidApartmentIds = AlreadyPaidApartments.map((payment) => payment.apartment._id.toString());
        const unpaidApartments = apartments.filter((apartment) => !AlreadyPaidApartmentIds.includes(apartment._id.toString()));


        res.json({ AlreadyPaidApartments, unpaidApartments, apartments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
};


module.exports = {
    createNewPayment,
    getAllPayments,
};