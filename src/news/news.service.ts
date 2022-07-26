import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NewsEntity } from "../entities";
import { CreateNewsDto, UpdateNewsDto } from "./news.model";

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private newsEntityRepository: Repository<NewsEntity>
  ) {}

  findAll(): Promise<NewsEntity[]> {
    return this.newsEntityRepository.find();
  }

  findOne(id: number): Promise<NewsEntity> {
    return this.newsEntityRepository.findOneBy({ id });
  }

  create(newsDto: CreateNewsDto): Promise<NewsEntity> {
    return this.newsEntityRepository.save(newsDto);
  }

  async updateNews(id: number, updateDto: UpdateNewsDto): Promise<NewsEntity> {
    const result = await this.newsEntityRepository
      .createQueryBuilder()
      .update(updateDto)
      .where({ id })
      .returning("*")
      .execute();

    return result.raw[0];
  }
}
