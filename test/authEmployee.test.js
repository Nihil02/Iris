const EmplooyeeService = require("../core/service/employeeService.js");

// TODO: Create a method for insert a mock user for testing purposes
test("Test 1 - Non-existent user", async () => {
    const res = await EmplooyeeService.authEmployee({user: 'Pepito', password: '12345'});
    expect(res).toBe(false);
});

test("Test 2 - Incorrect password", async () => {
    const res = await EmplooyeeService.authEmployee({user: 'raynou', password: 'incorrectPassword'});
    expect(res).toBe(false);
});

test("Test 3 - Correct user and password", async () => {
    const res = await EmplooyeeService.authEmployee({user: 'raynou', password: '12345'});
    expect(res).toBe(true);
})

// TODO: Create a method for delete the mock users
