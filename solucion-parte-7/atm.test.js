const Atm = require('./atm.js');
require('./account.js');

let mockGetAmount = jest.fn(() => 0);
let mockSetAmount = jest.fn(() => {});
jest.mock('./account.js', () => {
  return jest.fn().mockImplementation(() => {
    return { getAmount: mockGetAmount, setAmount: mockSetAmount };
  });
});

test("When I ask for account information, I expect to get a json with the expected information", () => {
    // Given
    const testee = new Atm();
    // When
    const value = testee.getAccountInformation();
    //Then
    expect(value).toStrictEqual({ amount: 0, isblocked: false });
    expect(mockGetAmount).toHaveBeenCalled();
});

test("When I call makeDeposit and then I call getAccountInformation, I expect to get a json with the expected information", () => {
    // Given
    const testee = new Atm();
    // When
    testee.makeDeposit(20);
    //Then
    expect(mockSetAmount).toHaveBeenCalledWith(20);
});