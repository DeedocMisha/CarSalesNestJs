import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './JwtAuthGuard';
import { RolesGuard } from '../roles/roles.guard';

/*GuardsModule делает JwtAuthGuard
и RolesGuard глобальными, чтобы не писать @UseGuards(JwtAuthGuard, RolesGuard) в каждом контроллере.*/

@Module({
  imports: [JwtModule], // Добавляем JwtModule в
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Проверка аутентификации
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Проверка ролей
    },
  ],
})
export class GuardsModule {}
