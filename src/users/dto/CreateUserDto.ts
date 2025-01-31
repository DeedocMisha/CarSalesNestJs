import { IsString, IsOptional, IsNumber } from 'class-validator';
import {NotNull} from "sequelize-typescript";

export class CreateUserDto {
  @IsString({ message: 'Username must be a string' })
  first_name: string;

  @IsString({ message: 'Password must be a string' })
  last_name: string;

  @IsString()
  @NotNull
  password: string;

  @IsOptional()
  @IsNumber({}, { message: 'Role ID must be a number' })
  role_id?: number;

}
