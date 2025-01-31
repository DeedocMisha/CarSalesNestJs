import { Module } from '@nestjs/common';
import { RolesModule } from '../roles/roles.module'; // Импортируем модуль, а не сервис
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from "./JwtAuthGuard";

@Module({
  imports: [
    RolesModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'BestChange',
      signOptions: { expiresIn: '1h' },
    }),
    //В User Service при успешной регистрации вызывается метод generateToken, который создает JWT токен, используя данные пользователя и секретный ключ из переменной окружения JWT_SECRET.
  ],
  controllers: [UsersController],
  providers: [UserService, JwtAuthGuard],
  exports: [UserService],
})
export class UsersModule {}
