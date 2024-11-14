import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  // host: process.env.DB_HOST,
  host: 'localhost',
  type: 'postgres',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/**/**.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  // cli: {
  // entitiesDir: 'src/**/**.entity.ts',
  // migrationsDir: 'src/database/migrations',
  // },
  synchronize: false,
});
