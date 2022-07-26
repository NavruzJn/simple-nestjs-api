import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { NewsService } from "./news.service";
import { CreateNewsDto, UpdateNewsDto } from "./news.model";
import { NewsEntity } from "../entities";
import { JwtAuthGuard } from "../auth";

@Controller("news")
@UseGuards(JwtAuthGuard)
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  getNews(): Promise<NewsEntity[]> {
    return this.newsService.findAll();
  }

  @Get("id")
  getNewsById(@Param() id: number): Promise<NewsEntity> {
    return this.newsService.findOne(id);
  }

  @Post()
  creatNews(@Body() newsDto: CreateNewsDto): Promise<NewsEntity> {
    return this.newsService.create(newsDto);
  }

  @Put("id")
  async updateNews(
    @Param() id: number,
    @Body() newsDto: UpdateNewsDto
  ): Promise<NewsEntity> {
    return this.newsService.updateNews(id, newsDto);
  }
}
