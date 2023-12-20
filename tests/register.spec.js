const register = require('../controllers/authController').register;
const { authRequest } = require('../requests/auth.request');
const userModel = require('../models/userModel'); 
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendMailToUser = require('../mailer/mailToUser');

jest.mock('../requests/auth.request');
jest.mock('../models/userModel');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../mailer/mailToUser');


describe('register', () => {
    it('should return a success response when registration is successful', async () => {
        const req = {
          body: {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
          }
        };
      
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      
        // Mock authRequest.RegisterValidation to return no errors
        authRequest.RegisterValidation.mockReturnValue({ error: null });
      
        // Mock userModel.findOne to return null (no email exists)
        userModel.findOne.mockReturnValue(null);
      
        // Mock bcryptjs.genSalt and bcryptjs.hash to return values
        bcryptjs.genSalt.mockResolvedValue('mockedSalt');
        bcryptjs.hash.mockResolvedValue('hashedPassword');
      
        // Mock userModel.save to return a user
        const mockSavedUser = {
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'hashedPassword',
          _doc: { 
            _id: 'some_id',
            name: 'John Doe',
            email: 'johndoe@example.com',
          },
        };
        userModel.prototype.save.mockResolvedValue(mockSavedUser);
      
        // Mock jwt.sign to return a token
        jwt.sign.mockReturnValue('mockedToken');
      
        sendMailToUser.mockReturnValue();
      
        await register(req, res);
      
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: 'Registration Successfully, Please Verify Your Email',
            newUser: { 
              _id: mockSavedUser._doc._id,
              name: mockSavedUser.name,
              email: mockSavedUser.email,
            },
          });
      });
      
  
    it('should return an error response when validation fails', async () => {
      const req = {
        body: {
            name: 'John Doe',
            email: 'test.com',
            password: 'hashedPassword',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mock authRequest.RegisterValidation to return an error
      authRequest.RegisterValidation.mockReturnValue({
        error: {
          details: [
            { message: 'Validation failed' }
          ]
        }
      });
        
      await register(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Validation failed' });
    });
  
    it('should return an error response when email already exists', async () => {
        const req = {
          body: {
            name: 'Jane Smith',
            email: 'existing@example.com',
            password: 'newpassword123',
          },
        };
      
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      
        // Mock authRequest.RegisterValidation to return no errors
        authRequest.RegisterValidation.mockReturnValue({ error: null });
      
        // Mock userModel.findOne to return an existing user
        userModel.findOne.mockReturnValue({ email: 'existing@example.com' });
      
        await register(req, res);
      
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'This Email is already exists Try To Sign in' });
      });
      
  });