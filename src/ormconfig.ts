import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',

  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASS || '',
  database: process.env.DATABASE_NAME || 'flasksPoon',
  url: process.env.DATABASE_URL || '',
  synchronize: false,
  entities: [join(__dirname, '**/*.entity{.ts,.js}')],
  extra: {
    connectTimeout: 20000,
  },
};
