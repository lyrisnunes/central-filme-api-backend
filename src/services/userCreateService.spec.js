const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory.js");
const AppError = require("../utils/AppError");

describe("UserCreateService", () => {
  let userRepositoryInMemory = null;
  let userCreateService = null;

  beforeEach(() => {
   userRepositoryInMemory = new UserRepositoryInMemory();
   userCreateService = new UserCreateService(userRepositoryInMemory);
  });

  it("user shoild be create", async () => {
    const user = {
      name: "User teste",
      email: "user@gmail.com",
      password: "123",
    };

    const userCreated = await userCreateService.execute(user);
    expect(userCreated).toHaveProperty("id");
  });

  it("user not should be create with exists email", async () => {
    const user1 = {
      name: "User Test",
      email: "user@gmail.com",
      password: "123"
    };

    const user2 = {
      name: "User Test 2",
      email: "user@gmail.com",
      password: "1234"
    };

    await userCreateService.execute(user1);
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já esta sendo usado."));
  });
});
