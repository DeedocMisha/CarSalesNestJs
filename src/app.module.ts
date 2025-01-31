import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '../users.model';
import { Roles } from '../roles.model';
import { Requests } from '../requests.model';
import { Models } from '../models.model';
import { UserRoles } from '../userroles.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { RequestsModule } from './requests/requests.module';
import { ModelsModule } from './models/models.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'passw',
      database: process.env.DB_NAME || 'postgres',
      models: [Users, Roles, Requests, Models, UserRoles],
    }),
    UsersModule,
    RolesModule, // Импортируем RolesModule
    RequestsModule,
    ModelsModule,
  ],
})
export class AppModule {}
