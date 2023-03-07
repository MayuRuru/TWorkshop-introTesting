const Account = require("./account.js");

test("Given I have a new account, When I call getAmount(), Then it returns 0", () => {
  const testee = new Account();

  const value = testee.getAmount();

  expect(value).toBe(0);
});
