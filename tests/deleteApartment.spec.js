const deleteApartment = require('../controllers/apartmentController').deleteApartment
const Apartment = require('../models/apartmentModel'); 

jest.mock('../models/apartmentModel');

describe('deleteApartment', () => {
  const mockReq = { params: { id: '123456' } };
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete the apartment with a valid id', async () => {
    const mockDeletedApartment = { 
        user_id: '123456',
        building_ID: 'A2',
        apartment_number: '33',
        resident_name: 'adnane',
        resident_phone: '124567890',
        resident_cin: 'J343456',
        condition: 'owner',
     };
    Apartment.findByIdAndDelete.mockResolvedValue(mockDeletedApartment);

    await deleteApartment(mockReq, mockRes);

    expect(Apartment.findByIdAndDelete).toHaveBeenCalledWith(mockReq.params.id);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: 'Apartment deleted successfully',
      deletedApartment: mockDeletedApartment,
    });
  });

  it('should return a 404 error if the apartment is not found', async () => {
    Apartment.findByIdAndDelete.mockResolvedValue(null);

    await deleteApartment(mockReq, mockRes);

    expect(Apartment.findByIdAndDelete).toHaveBeenCalledWith(mockReq.params.id);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Apartment not found' });
  });

});
