const getApartmentWithId = require('../controllers/apartmentController').getApartmentWithId
const Apartment = require('../models/apartmentModel');

jest.mock('../models/apartmentModel');

describe('getApartmentWithId', () => {
  const mockReq = { params: { id: '123456' } };
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  it('should return the apartment with a valid id', async () => {

    const mockApartment = { 
      user_id: '123456',
      building_ID: 'A2',
      apartment_number: '33',
      resident_name: 'adnane',
      resident_phone: '124567890',
      resident_cin: 'J343456',
      condition: 'owner',
     };
     
    Apartment.findById.mockResolvedValue(mockApartment);

    await getApartmentWithId(mockReq, mockRes);

    expect(Apartment.findById).toHaveBeenCalledWith(mockReq.params.id);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: 'Apartment found successfully',
      data: mockApartment,
    });
  });

  it('should return a 404 error if the apartment is not found', async () => {
    Apartment.findById.mockResolvedValue(null);

    await getApartmentWithId(mockReq, mockRes);

    expect(Apartment.findById).toHaveBeenCalledWith(mockReq.params.id);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Apartment not found' });
  });
});
