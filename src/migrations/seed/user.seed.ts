import { UserStatus, UserType } from "../../enums";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { UserEntity } from "../../entities";
import { Repository } from "typeorm";

export const users = [
  {
    login: "new_user",
    password: "password",
    type: UserType.ADMIN,
    status: UserStatus.ACTIVE,
  },
];

@Injectable()
export class UserSeed implements OnModuleInit {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
    private configService: ConfigService
  ) {}

  async onModuleInit(): Promise<UserEntity[]> {
    const env = this.configService.get<string>("env");
    if (env === "production") {
      return [];
    }
    const createdUsers = this.userEntityRepository.save(users);
    console.log("Users are created");

    return createdUsers;
  }
}
