const createNewPayment = require('../controllers/paymentController').createNewPayment
const Payment = require('../models/paymentModel');

jest.mock('../models/paymentModel');

const mockDate = new Date('2023-12-15T12:07:35.121Z');
global.Date = jest.fn(() => mockDate);

describe('createNewPayment', () => {
  const mockReq = {
    body: {
      user_id: '65760f2b14be6e4fb8408c3f',
      payment: 'paid',
      apartment: '6578a69cdc7f0feab7589382',
    },
  };
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new payment successfully', async () => {
    const mockNewPayment = {};
    Payment.create.mockResolvedValue(mockNewPayment);

    await createNewPayment(mockReq, mockRes);

    expect(Payment.create).toHaveBeenCalledWith({
      user_id: mockReq.body.user_id,
      payment: mockReq.body.payment,
      apartment: mockReq.body.apartment,
      month: 12,
      year: 2023,
    });
    expect(mockRes.json).toHaveBeenCalledWith({
      success: 'Payment Done',
      newPayment: mockNewPayment,
    });
  });
});
