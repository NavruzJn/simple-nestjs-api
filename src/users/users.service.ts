import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entities";
import { FindOptionsWhere } from "typeorm/find-options/FindOptionsWhere";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  findOne(id: string): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneBy(where: FindOptionsWhere<UserEntity>): Promise<UserEntity> {
    return this.usersRepository.findOneBy(where);
  }

  findByLoginAndPassword(login: string, password: string): Promise<UserEntity> {
    return this.usersRepository.findOneBy({
      login,
      password,
    });
  }
}
