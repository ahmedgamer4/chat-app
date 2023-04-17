import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  entities: [__dirname + '/../**/*.entity{.js,.ts}'],
  type: 'postgres',
  url: process.env.DATABASE_URI,
  // TODO: Do not forget to remove this in production
  synchronize: true,
};
