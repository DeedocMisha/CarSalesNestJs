import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestService } from './requests.service';
import { UsersModule } from '../users/users.module';
import { ModelsModule } from '../models/models.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ModelsModule, UsersModule, JwtModule],
  controllers: [RequestsController],
  providers: [RequestService],
})
export class RequestsModule {}
