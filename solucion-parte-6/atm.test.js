const Atm = require('./atm.js');

test("When I ask for account information, I expect to get a json with the expected information", () => {
    // Given
    const testee = new Atm();
    // When
    const value = testee.getAccountInformation();
    //Then
    expect(value).toStrictEqual({ amount: 0, isblocked: false });
});

test("When I call makeDeposit and then I call getAccountInformation, I expect to get a json with the expected information", () => {
    // Given
    const testee = new Atm();
    // When
    testee.makeDeposit(20);
    //Then
    expect(testee.getAccountInformation()).toStrictEqual({ amount: 20, isblocked: false });
});