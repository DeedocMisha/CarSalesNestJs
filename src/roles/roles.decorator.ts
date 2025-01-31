//Для контроллера админа 1
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
//Отвесает за   @Roles('admin')
/*
* Roles(...roles: string[]) — декоратор, который принимает массив строк (roles), например ['admin'], и привязывает их к метаданным маршрута.
* */