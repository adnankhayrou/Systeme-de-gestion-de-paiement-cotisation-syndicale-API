const resetPassword = require('../controllers/authController').resetPassword;
const bcryptjs = require('bcryptjs');
const userModel = require('../models/userModel');
const { emailAndPasswordRequest } = require('../requests/emailAndPassword.request');

jest.mock('bcryptjs');
jest.mock('../models/userModel');
jest.mock('../requests/emailAndPassword.request');

describe('resetPassword', () => {
    it('should reset the password successfully', async () => {
        const req = {
          user: { _id: 'user_id' },
          body: { password: 'new_password' },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      
        // Mock the bcrypt functions
        bcryptjs.genSalt.mockResolvedValue('salt');
        bcryptjs.hash.mockResolvedValue('hashed_password');
      
        // Mock the userModel's updateOne function
        userModel.updateOne.mockResolvedValue({ nModified: 1 });
      
        // Set up the mock for PasswordValidation
        emailAndPasswordRequest.PasswordValidation = jest.fn(() => {
          return {
            error: null, // Assuming PasswordValidation returns no error
          };
        });
      
        await resetPassword(req, res);
      
        expect(bcryptjs.genSalt).toHaveBeenCalledWith(10);
        expect(bcryptjs.hash).toHaveBeenCalledWith('new_password', 'salt');
        expect(userModel.updateOne).toHaveBeenCalledWith(
          { _id: 'user_id' },
          { password: 'hashed_password' }
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: 'Your Password reseted successfully' });
      });
      
  

      it('should handle database update errors when an error occurs', async () => {
        const req = {
          user: { _id: 'user_id' },
          body: { password: 'new_password' },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      
        // Mock the bcrypt functions
        bcryptjs.genSalt.mockResolvedValue('salt');
        bcryptjs.hash.mockResolvedValue('hashed_password');
      
        // Mock a database update error
        userModel.updateOne.mockRejectedValue(new Error('Database update error'));
      
        // Set up the mock for PasswordValidation
        emailAndPasswordRequest.PasswordValidation = jest.fn(() => {
          return {
            error: null, // Assuming PasswordValidation returns no error
          };
        });
      
        try {
          await resetPassword(req, res);
        } catch (error) {
          console.log('Error in resetPassword:', error);
        }
      
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Something Went Wrong' });
      });
      
      
});
