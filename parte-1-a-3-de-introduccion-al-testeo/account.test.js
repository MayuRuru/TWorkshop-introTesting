const testee = require('./account.js');

test("Given I have my default Amount, When I ask for it, Then it returns 0", () => {
    // Given: Objetos que estamos usando en nuestro test

    // When: Accion que estamos testeando
    const value = testee.getAmount();

    // Then: Expectativas
    expect(value).toBe(0);
});

test("Given I have my default Amount, When I set value to 10, Then it should return 10", () => {
    // Given: Objetos que estamos usando en nuestro test
    // When: Accion que estamos testeando
    testee.setAmount(10);

    // Then: Expectativas
    expect(testee.getAmount()).toBe(10);
});

test("Given I have my default Amount, When I set value that is not a number, Then it should throw and error", () => {
    // Given: Objetos que estamos usando en nuestro test
    
    expect(() => { 
        // When: Accion que estamos testeando
        testee.setAmount("not a number") 
    })
    // Then: Expectativas
    .toThrow();
});
