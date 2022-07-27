import { NewsCategory, NewsStatus } from "../../enums";
import { InjectRepository } from "@nestjs/typeorm";
import { NewsEntity } from "../../entities";
import { Repository } from "typeorm";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export const news = [
  {
    title: "News Title",
    description: "News Description",
    content: "News Content",
    category: NewsCategory.MEDIA,
    status: NewsStatus.CREATED,
  },
];

@Injectable()
export class NewsSeed implements OnModuleInit {
  constructor(
    @InjectRepository(NewsEntity)
    private newsEntityRepository: Repository<NewsEntity>,
    private configService: ConfigService
  ) {}

  async onModuleInit(): Promise<NewsEntity[]> {
    const env = this.configService.get<string>("env");
    if (env === "production") {
      return [];
    }
    const createdNews = this.newsEntityRepository.save(news);
    console.log("News are created");

    return createdNews;
  }
}
