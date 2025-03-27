import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
 type: 'mysql',
 url: process.env.MYSQL_URL,
//  host: process.env.MYSQLHOST, 
//  port: Number(process.env.MYSQLPORT), 
//  username: process.env.MYSQLUSER, 
//  password: process.env.MYSQLPASSWORD, 
//  database: process.env.MYSQLDATABASE,
     synchronize:false,
     entities: [join(__dirname, '**/*.entity{.ts,.js}')],
     extra: {
        connectTimeout: 20000, 
      },
};