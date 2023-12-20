const createNewApartment = require('../controllers/apartmentController').createNewApartment;
const Apartment = require('../models/apartmentModel');

jest.mock('../models/apartmentModel');

describe('createNewApartment', () => {

  const mockReq = {
    body: {
      user_id: '123456',
      building_ID: 'A2',
      apartment_number: '33',
      resident_name: 'adnane',
      resident_phone: '124567890',
      resident_cin: 'J343456',
      condition: 'owner',
    },
  };
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };


  it('should create a new apartment', async () => {
    Apartment.find.mockResolvedValue([]);
    await createNewApartment(mockReq, mockRes);
  
    expect(Apartment.find).toHaveBeenCalledWith({ resident_cin: mockReq.body.resident_cin });
    expect(Apartment.create).toHaveBeenCalledWith(mockReq.body);
  
    expect(mockRes.json).toHaveBeenCalledWith({
      success: 'Apartment created successfully',
    });
  });


  it('should return an error response if apartment with resident_cin already exists', async () => {
   
    Apartment.find.mockResolvedValue([{ 
      user_id: '123456',
      building_ID: 'A2',
      apartment_number: '33',
      resident_name: 'adnane',
      resident_phone: '124567890',
      resident_cin: 'J343456',
      condition: 'owner',
     }]);

    await createNewApartment(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Apartment Already Exist' });
  });
});
