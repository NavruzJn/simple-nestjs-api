import { Test, TestingModule } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { UsersService } from "../users";
import { UserStatus, UserType } from "../enums";

const user = {
  id: "test_user",
  login: "login",
  password: "password",
};

describe("AuthService", () => {
  let service: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByLoginAndPassword: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("Should login", () => {
    it("success", async () => {
      jest.spyOn(userService, "findByLoginAndPassword").mockResolvedValueOnce({
        id: "test_id",
        login: "login",
        password: "password",
        type: UserType.ADMIN,
        status: UserStatus.ACTIVE,
        created_at: new Date(),
        updated_at: new Date(),
      });

      jest.spyOn(jwtService, "sign").mockReturnValueOnce("token");

      const { access_token } = await service.login(user);

      expect(access_token).toBeDefined();
    });
  });

  describe("Should validate user", () => {
    it("success", async () => {
      jest.spyOn(userService, "findOneBy").mockResolvedValueOnce({
        id: "test_id",
        login: "login",
        password: "password",
        type: UserType.ADMIN,
        status: UserStatus.ACTIVE,
        created_at: new Date(),
        updated_at: new Date(),
      });

      jest.spyOn(jwtService, "sign").mockReturnValueOnce("token");

      const userData = await service.validateUser(user.login, user.password);

      expect(userData).toBeDefined();
    });

    it("fail", async () => {
      jest.spyOn(userService, "findOneBy").mockResolvedValueOnce({
        id: "test_id",
        login: "login",
        password: "password_updated",
        type: UserType.ADMIN,
        status: UserStatus.ACTIVE,
        created_at: new Date(),
        updated_at: new Date(),
      });

      const userData = await service.validateUser(user.login, user.password);

      expect(userData).toBeNull();
    });
  });
});
