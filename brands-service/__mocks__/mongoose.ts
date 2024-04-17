// Inside __mocks__/mongoose.js

const mockFindById = jest.fn();
const mockSelect = jest.fn();
const mockCreate = jest.fn();
const mockUpdateOne = jest.fn();
const mockDeleteOne = jest.fn();

// Mock Schema constructor
const Schema = jest.fn().mockImplementation(() => ({
    findById: mockFindById,
    select: mockSelect,
    create: mockCreate,
    updateOne: mockUpdateOne,
    deleteOne: mockDeleteOne,
}));

// Mock Model function
const model = jest.fn().mockReturnValue({
    findById: mockFindById,
    select: mockSelect,
    create: mockCreate,
    updateOne: mockUpdateOne,
    deleteOne: mockDeleteOne,
});

module.exports = {
    model,
    Schema, // Export the Schema constructor
    connect: jest.fn(),
    disconnect: jest.fn(),
};
