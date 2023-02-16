const atm = require('./atm.js');
require('./account.js');

const mockGetAmount = jest.fn(() => 0);
const mockSetAmount = jest.fn(() => {});
jest.mock('./account.js', () => {
    return {
        openAccount: jest.fn(() => {
            return {
                getAmount: mockGetAmount,
                setAmount: mockSetAmount
            }
        }),
    };
});

test("When I ask for account information, I expect to get a json with the expected information", () => {
    // Given
    const testee = atm.startAtmForAccount()

    // When
    const value = testee.getAccountInformation();

    //Then
    expect(value).toStrictEqual({ amount: 0, isblocked: false });
    expect(mockGetAmount).toHaveBeenCalled();
});

test("When I call makeDeposit and then I call getAccountInformation, I expect setAmount to have been called with 20", () => {
    // Given
    const testee = atm.startAtmForAccount()

    // When
    testee.makeDeposit(20);

    //Then
    expect(mockSetAmount).toHaveBeenCalledWith(20);
});