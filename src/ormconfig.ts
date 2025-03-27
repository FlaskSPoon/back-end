import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
 type: 'mysql',
//  host: process.env.MYSQLHOST, 
//  port: Number(process.env.MYSQLPORT), 
//  username: process.env.MYSQLUSER, 
//  password: process.env.MYSQLPASSWORD, 
//  database: process.env.MYSQLDATABASE,

host: process.env.DB_HOST || 'localhost',
port: Number(process.env.DB_PORT) || 3306, 
username: process.env.DB_USER || 'root', 
password: process.env.DB_PASS || '',
database: process.env.DB_NAME || 'flasksPoon',
     synchronize:false,
     entities: [join(__dirname, '**/*.entity{.ts,.js}')],
     extra: {
        connectTimeout: 20000, 
      },
};