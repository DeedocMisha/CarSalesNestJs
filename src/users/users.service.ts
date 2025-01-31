import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RolesService } from '../roles/roles.service';
import { CreateUserDto } from './dto/CreateUserDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './JWT.payload.interface';
import { ValidateUserDto } from './dto/ValidateUserDto';
import {Users} from "../model/users.model";
import {Roles} from "../model/roles.model";
import {UserRoles} from "../model/userroles.model";
import {DataTypes} from "sequelize";


@Injectable()
export class UserService {
  constructor(
    private readonly rolesService: RolesService,
    private readonly jwtService: JwtService,
  ) {}

  // Метод для логина пользователя
  async login(validateUserDto: ValidateUserDto) {
    const user = await this.validateUser(validateUserDto); // Проверка пароля пользователя
    return this.generateToken(user); // Генерация JWT токена для пользователя
  }

  // Метод для регистрации пользователя
  async register(createUserDto: CreateUserDto) {
    // Хешируем пароль пользователя
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Создаем запись пользователя в базе данных
    const user = await Users.create({
      first_name: createUserDto.first_name,
      password_hash: hashedPassword,
    });

    await this.assignDefaultRole(user.id);

    return this.generateToken(user); // Возвращаем токен после успешной регистрации
  }

  // Генерация JWT токена для пользователя
  private async generateToken(user: Users) {
    const payload: JwtPayload = {
      // JwtPayload эт dto jwt токена
      id: user.id,
      first_name: user.first_name,
      roles: user.roles ? user.roles.map((role) => role.name) : [], // Массив ролей пользователя
    };
    return {
      token: this.jwtService.sign(payload, { expiresIn: '1h' }), // Генерация токена с 1-часовой активностью
    };
  }

  // Проверка данных пользователя при логине
  private async validateUser(validateUserDto: ValidateUserDto) {
    const user = await Users.findOne({
      where: { first_name: validateUserDto.first_name },
      include: [{ model: Roles }],
    });

    if (!user) {
      throw new HttpException(
        'Incorrect email or password',
        HttpStatus.UNAUTHORIZED,
      ); // Если пользователь не найден
    }

    const passwordMatches = await bcrypt.compare(
      //Сравниваем пароль польз и пароль введенный
      validateUserDto.password,
      user.password_hash,
    );
    if (!passwordMatches) {
      throw new HttpException(
        'Incorrect email or password',
        HttpStatus.UNAUTHORIZED,
      ); // Если пароль неверен
    }

    return user; // Возвращаем пользователя
  }

  private async assignDefaultRole(user_id: number) {
    // Здесь мы ищем роль по имени, а не по ID
    const defaultRole = await this.rolesService.findOne({
      where: { rolename: 'user' }, // Ищем роль по имени
    });

    if (!defaultRole) {
      throw new HttpException('Default role not found', HttpStatus.BAD_REQUEST); // Если роль не найдена
    }

    await UserRoles.create({ user_id, role_id: defaultRole.id }); // Создаем запись о пользователе и роли
    return defaultRole; // Возвращаем роль
  }


  // Метод для назначения роли администратора
  async DoAdmin(id: number) {
    const user = await this.findOne({ where: { id } }); // Ищем пользователя по ID
    const role = await this.rolesService.findOne({
      where: { rolename: 'admin' },
    }); // Ищем роль администратора по имени

    if (!user) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      ); // Если пользователь не найден
    }

    if (!role) {
      throw new HttpException(
        'Role with rolename "admin" not found',
        HttpStatus.NOT_FOUND,
      ); // Если роль не найдена
    }

    await user.$add('roles', role.id); // Назначаем роль пользователю
    return {
      message: 'Role assigned successfully', // Возвращаем успешное сообщение
      userId: user.id,
      roleId: role.id,
    };
  }

  // Метод для поиска пользователя по заданным опциям
  async findOne(options): Promise<Users | null> {
    try {
      const user = await Users.findOne(options); // Ищем пользователя по опциям
      if (!user) {
        console.warn('User not found with the provided options:', options); // Если пользователь не найден
        return null;
      }
      return user; // Возвращаем пользователя
    } catch (error) {
      console.error(`Error while finding user: ${error.message}`);
      throw new Error(`Error finding user: ${error.message}`);
    }
  }


}
