const testee = require('./account.js');

test("Given I have my default Amount, When I ask for it, Then it returns 5", () => {
    // Given: Objetos que estamos usando en nuestro test

    // When: Accion que estamos testeando
    const value = testee.getAmount();

    // Then: Expectativas
    expect(value).toBe(5);
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

test("When I call getBlockAccount, I expect it to return false by default", () => {
    // Given: testee
    // When
    const value = testee.getBlockAccount();

    // Then
    expect(value).toBe(false);
});

test("When I call blockAccount, I expect that calling setAmount with a number to return an error", () => {
    // Given: testee
    // When
    testee.blockAccount();

    // Then
    expect(() => { 
        testee.setAmount(23) 
    })
    .toThrow();
});