import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';
import { InitService } from './init.service';

@Module({
  imports: [UsersModule, RolesModule],
  providers: [InitService],
  exports: [InitService],
})
export class InitModule {}
