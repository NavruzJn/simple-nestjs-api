import { Module } from "@nestjs/common";
import { NewsService } from "./news.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NewsEntity } from "../entities";
import { NewsController } from "./news.controller";
import { NewsSeed } from "../migrations/seed";

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity])],
  controllers: [NewsController],
  providers: [NewsService, NewsSeed],
  exports: [NewsService],
})
export class NewsModule {}
