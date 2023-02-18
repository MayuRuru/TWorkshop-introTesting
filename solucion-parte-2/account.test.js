const Account = require('./account.js');

test("Given I have a new account, When I call getAmount(), Then it returns 0", () => {
    // Given: Objetos que estamos usando en nuestro test
    testee = new Account();

    // When: Accion que estamos testeando
    const value = testee.getAmount();

    // Then: Expectativas
    expect(value).toBe(0);
});