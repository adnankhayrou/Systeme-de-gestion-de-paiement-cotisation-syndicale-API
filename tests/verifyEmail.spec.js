const { verifyEmail } = require('../controllers/authController');
const userModel = require('../models/userModel');
const tokenRequest = require('../requests/token.request');


jest.mock('../models/userModel');
jest.mock('../requests/token.request');

describe('verifyEmail function', () => {
  it('returns a 401 response if no token is provided', async () => {
    const req = { params: { token: '' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await verifyEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Don't have access" });
  });

  it('returns a 401 response if the token is invalid', async () => {
    const req = { params: { token: 'invalid_token' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    // Mock the tokenRequest function to return an unsuccessful response
    tokenRequest.mockReturnValue({ success: false });

    await verifyEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Don't have access" });
  });

  it('returns a 200 response and updates user verification if the token is valid', async () => {
    const req = { params: { token: 'valid_token' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    // Mock the tokenRequest function to return a successful response
    tokenRequest.mockReturnValue({ success: true, data: { _id: 'user_id' } });

    // Mock userModel.updateOne method to return a success response
    userModel.updateOne.mockResolvedValue({ nModified: 1 });

    await verifyEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: 'Your Account activated successfully' });
  });
});
