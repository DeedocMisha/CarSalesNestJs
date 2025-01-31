import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';
import { ModelsService } from './models.service';

@Module({
  imports: [UsersModule, RolesModule],
  providers: [ModelsService],
  exports: [ModelsService],
})
export class ModelsModule {}
