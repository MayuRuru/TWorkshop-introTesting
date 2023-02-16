const testee = require('./atm.js');
const accountMock = require('./account.js');

jest.mock('./account.js');


test("When I ask for account information, I expect to get a json with the expected information", () => {
    // Given
    let spy = jest.spyOn(accountMock, 'getAmount').mockImplementation(() => 0);

    // When
    const value = testee.getAccountInformation();
    //Then
    expect(value).toStrictEqual({ amount: 0, isblocked: false });
    expect(accountMock.getAmount).toHaveBeenCalled();

    spy.mockRestore();
});

test("When I call makeDeposit and then I call getAccountInformation, I expect testee to call setAmount", () => {
    // Given
    let spy = jest.spyOn(accountMock, 'getAmount').mockImplementation(() => 0);

    // When
    testee.makeDeposit(20);

    //Then
    expect(accountMock.setAmount).toHaveBeenCalledWith(20);
    spy.mockRestore();
});