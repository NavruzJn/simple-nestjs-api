import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../entities";
import { UserSeed } from "../migrations/seed";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, UserSeed],
  exports: [UsersService],
})
export class UsersModule {}
