import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UserService } from './users.service';
import { ValidateUserDto } from './dto/ValidateUserDto';
import { JwtAuthGuard } from './JwtAuthGuard';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post('register')
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.register(userDto);
  }

  @Post('login')
  login(@Body() userDto: ValidateUserDto) {
    return this.usersService.login(userDto);
  }

  @Post('admin/:id')
  @UseGuards(JwtAuthGuard, RolesGuard) // Защита маршрута с помощью стражей
  @Roles('admin') // Ограничение доступа только для администраторов
  DoUserAdmin(@Param('id') id: number) {
    return this.usersService.DoAdmin(id);
  }

 @Get('GetBalance')
  getBalance(@Param('userid') userid){
    return this.usersService.getBalance(userid);
 }

}
