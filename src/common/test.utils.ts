import { Repository } from "typeorm";

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOneBy: jest.fn((entity) => entity),
    findOne: jest.fn((entity) => entity),
    find: jest.fn((entities) => entities),
    save: jest.fn((entity) => entity),
  })
);

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};
