import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { InitModule } from './init_data/init.module';
import {Users} from "./models/users.model";
import {Roles} from "./models/roles.model";
import {UserRoles} from "./models/userroles.model";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'passw',
      database: process.env.DB_NAME || 'postgres',
      models: [Users, Roles, UserRoles],
    }),
    UsersModule,
    RolesModule, // Импортируем RolesModule
    InitModule,
  ],
})
export class AppModule {}
