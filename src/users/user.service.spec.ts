import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UsersService } from "../users";
import { UserStatus, UserType } from "../enums";
import { Repository } from "typeorm";
import { UserEntity } from "../entities";
import { MockType, repositoryMockFactory } from "../common/test.utils";

const user = {
  id: "test_id",
  login: "login",
  password: "password",
  type: UserType.ADMIN,
  status: UserStatus.ACTIVE,
  created_at: new Date(),
  updated_at: new Date(),
};

describe("UserService", () => {
  let userService: UsersService;
  let repositoryMock: MockType<Repository<UserEntity>>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    userService = module.get<UsersService>(UsersService);
    repositoryMock = module.get(getRepositoryToken(UserEntity));

    repositoryMock.findOneBy.mockReturnValue(user);
  });

  it("should be defined", () => {
    expect(userService).toBeDefined();
  });

  it("find one by", async () => {
    const userData = await userService.findOneBy({ login: user.login });

    expect(userData).toBeDefined();
  });

  it("find one", async () => {
    const userData = await userService.findOne(user.id);

    expect(userData).toBeDefined();
  });

  it("find by login and password", async () => {
    const userData = await userService.findByLoginAndPassword(
      user.login,
      user.password
    );

    expect(userData).toBeDefined();
  });
});
