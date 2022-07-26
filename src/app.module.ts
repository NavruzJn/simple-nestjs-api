import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { appConfig } from "./config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth";
import { UsersModule } from "./users";
import { NewsModule } from "./news";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    NewsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
          configService.get("database"),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: [appConfig],
    }),
  ],
})
export class AppModule {}
