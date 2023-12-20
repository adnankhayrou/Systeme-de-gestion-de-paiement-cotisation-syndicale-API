const getApartmentWithUserId = require('../controllers/apartmentController').getApartmentWithUserId
const Apartment = require('../models/apartmentModel');

jest.mock('../models/apartmentModel');

describe('getApartmentWithUserId', () => {
  const mockReq = { params: { user_id: '123456' } };
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };


  it('should return apartments for a valid user_id', async () => {
    const mockApartments = [{ 
        user_id: '123456',
      building_ID: 'A2',
      apartment_number: '33',
      resident_name: 'adnane',
      resident_phone: '124567890',
      resident_cin: 'J343456',
      condition: 'owner',
     }, { 
        user_id: '123456',
      building_ID: 'A3',
      apartment_number: '3',
      resident_name: 'youssef',
      resident_phone: '0987654321',
      resident_cin: 'J45690',
      condition: 'rent',
      }];
    Apartment.find.mockResolvedValue(mockApartments);

    await getApartmentWithUserId(mockReq, mockRes);

    expect(Apartment.find).toHaveBeenCalledWith({ user_id: mockReq.params.user_id });
    expect(mockRes.json).toHaveBeenCalledWith({
      success: 'Apartments found successfully',
      apartments: mockApartments,
    });
  });

  it('should return a 404 error if no apartments are found for the user', async () => {
    Apartment.find.mockResolvedValue([]);

    await getApartmentWithUserId(mockReq, mockRes);

    expect(Apartment.find).toHaveBeenCalledWith({ user_id: mockReq.params.user_id });
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'No apartments found for this user' });
  });
});
