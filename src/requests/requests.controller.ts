import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Res,
} from '@nestjs/common';
import { RequestService } from './requests.service';
import { Roles } from '../roles/roles.decorator';
import { JwtAuthGuard } from '../users/JwtAuthGuard';
import { RolesGuard } from '../roles/roles.guard';
import { Response } from 'express';


@Controller()
export class RequestsController {
  constructor(private readonly requestService: RequestService) {}


  @Get('balance/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async getBalance(@Param('id') userId: number) {

  }
}
