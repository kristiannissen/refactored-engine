require("./../user.js");

describe("User tests", () => {
  // Fake the token
  const FAKE_TOKEN = "02124309c9867a7616972f52a55db1b4";

  test("User has no token", () => {
    expect(hasToken()).toBe(false);
  });

  setToken(FAKE_TOKEN);

  test("user get token", () => {
    expect(getToken()).toEqual(FAKE_TOKEN);
  });

  test("User has token", () => {
    expect(hasToken()).toBe(true);
  });
});
