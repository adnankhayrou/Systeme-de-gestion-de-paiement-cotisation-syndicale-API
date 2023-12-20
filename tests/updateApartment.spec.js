const updateApartment = require('../controllers/apartmentController').updateApartment
const Apartment = require('../models/apartmentModel'); 

jest.mock('../models/apartmentModel');

describe('updateApartment', () => {
  const mockReq = {
    params: { id: '123456' },
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

  it('should update the apartment with a valid id', async () => {
    const mockUpdatedApartment = { 
        user_id: '123456',
        building_ID: 'A2',
        apartment_number: '33',
        resident_name: 'adnane',
        resident_phone: '124567890',
        resident_cin: 'J343456',
        condition: 'owner',
     };
    Apartment.findByIdAndUpdate.mockResolvedValue(mockUpdatedApartment);

    await updateApartment(mockReq, mockRes);

    expect(Apartment.findByIdAndUpdate).toHaveBeenCalledWith(mockReq.params.id, mockReq.body);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: 'Apartment updated successfully',
      updatedApartment: mockUpdatedApartment,
    });
  });

  it('should return a 404 error if the apartment is not found', async () => {
    Apartment.findByIdAndUpdate.mockResolvedValue(null);

    await updateApartment(mockReq, mockRes);

    expect(Apartment.findByIdAndUpdate).toHaveBeenCalledWith(mockReq.params.id, mockReq.body);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Apartment not found' });
  });
});
