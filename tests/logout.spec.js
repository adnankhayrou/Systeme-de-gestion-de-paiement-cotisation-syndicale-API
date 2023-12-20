const logout = require('../controllers/authController').logout;

describe('logout function', () => {
  it('clears the authToken cookie and responds with success', () => {
    const req = {};
    const res = {
      clearCookie: jest.fn(),
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    logout(req, res);

    expect(res.clearCookie).toHaveBeenCalledWith('authToken');

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({ success: 'You are Logged out successfully' });
  });
});
