const getResidentPayment = require('../controllers/paymentController').getResidentPayment
const Payment = require('../models/paymentModel');

jest.mock('../models/paymentModel');

describe('getResidentPayment', () => {
  const mockReq = {
    params: { payment_id: '123456' },
  };
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };


  it('should get resident payment successfully', async () => {
    const mockResidentPayment = {
      data: 'resident payment data',
    };

    Payment.find.mockImplementation(() => ({
      populate: jest.fn().mockResolvedValue(mockResidentPayment),
    }));

    await getResidentPayment(mockReq, mockRes);

    expect(Payment.find).toHaveBeenCalledWith({ _id: mockReq.params.payment_id });
    expect(mockRes.json).toHaveBeenCalledWith({ residentPayment: mockResidentPayment });
  });
});
