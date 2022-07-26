export type AppConfig = {
  auth: {
    jwt: {
      secret: string;
    };
  };
  database: {
    type: string;
    uuidExtension: string;
    host: string;
    database: string;
    username: string;
    password: string;
    migrationsRun: true;
    synchronize: false;
    logging: boolean;
  };
  port: number;
};
