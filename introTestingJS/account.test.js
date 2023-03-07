const Account = require("./account.js");

test("Given I have a new account, When I call getAmount(), Then it returns 0", () => {
  const testee = new Account();

  const value = testee.getAmount();

  expect(value).toBe(0);
});

test("Given I have a new account, When I call setAmount with 10, Then getAmount should return 10", () => {
  testee = new Account();

  testee.setAmount(10);

  expect(testee.getAmount()).toBe(10);
});

test("Given I have a new account, When I set value that is not a number, Then it should throw an error", () => {
  testee = new Account();

  // to throw an error we have to write it inside a function to do a try-catch:
  action = () => {
    testee.setAmount("not a number");
  };

  expect(action).toThrow();
});

// Part 4:

test("Given I have a new account, When I call getBlockAccount, Then it should return false", () => {
  testee = new Account();

  testee.getBlockAccount();

  expect(testee.getBlockAccount()).toBe(false);
});

test("Given I have a new account, When I call blockAccount, Then it should return true", () => {
  testee = new Account();

  testee.blockAccount();

  expect(testee.blockAccount()).toBe(true);
});

test("Given I have a new account, When I call blockAccount, Then it should throw an error", () => {
  testee = new Account();

  action = () => {
    testee.setAmount(13);
  };

  expect(action).toThrow();
});
