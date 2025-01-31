import { Injectable } from '@nestjs/common';
import {Roles} from "../model/roles.model";


@Injectable()
export class RolesService {
  async getRoles(): Promise<Roles[]> {
    return Roles.findAll();
  }

  async findOne(options: any): Promise<Roles | null> {
    try {
      const role = await Roles.findOne(options);
      if (!role) {
        console.warn('Role not found with the provided options:', options);
        return null;
      }
      return role;
    } catch (error) {
      console.error(`Error while finding role: ${error.message}`);
      throw new Error(`Ошибка при поиске роли: ${error.message}`);
    }
  }
}
