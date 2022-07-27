import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { appConfig } from "./config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth";
import { NewsModule } from "./news";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get("database"),
      inject: [ConfigService],
    }),
    NewsModule,
    AuthModule,
  ],
})
export class AppModule {}
