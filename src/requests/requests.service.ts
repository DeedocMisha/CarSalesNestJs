import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../users/users.service';
import { ModelsService } from '../models/models.service';

@Injectable()
export class RequestService {
  constructor(
    private readonly userService: UserService,
    private readonly modelsService: ModelsService,
  ) {}

}
