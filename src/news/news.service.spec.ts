import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UsersService } from "../users";
import { Repository } from "typeorm";
import { NewsEntity } from "../entities";
import { MockType, repositoryMockFactory } from "../common/test.utils";
import { NewsService } from "./news.service";
import { news } from "../migrations/seed";

describe("NewsService", () => {
  let newsService: NewsService;
  let repositoryMock: MockType<Repository<NewsEntity>>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsService,
        {
          provide: getRepositoryToken(NewsEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    newsService = module.get<NewsService>(NewsService);
    repositoryMock = module.get(getRepositoryToken(NewsEntity));

    repositoryMock.find.mockReturnValue(news);
    repositoryMock.findOneBy.mockReturnValue(news[0]);
    repositoryMock.findOne.mockReturnValue(news[0]);
    repositoryMock.save.mockReturnValue(news[0]);
  });

  it("should be defined", () => {
    expect(newsService).toBeDefined();
  });

  it("find one", async () => {
    const newsData = await newsService.findOne(1);

    expect(newsData).toEqual(news[0]);
  });

  it("find all", async () => {
    const newsData = await newsService.findAll();

    expect(newsData).toEqual(news);
  });

  it("create", async () => {
    const newsData = await newsService.create(news[0]);

    expect(newsData).toEqual(news[0]);
  });
});
