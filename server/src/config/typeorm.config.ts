import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  entities: ['dist/src/**/*.entity.js'],
  type: 'postgres',
  url: `postgres://mydatabase_qgu8_user:
wp8ObMr2e3xc5nZjr5sOdV0vi2OWzxDG@dpg-cgqlt2l269v32o9okrl0-a.frankfurt-postgres.render.com/mydatabase_qgu8?ssl=true`,
  // TODO: Do not forget to remove this in production
  synchronize: true,
};
