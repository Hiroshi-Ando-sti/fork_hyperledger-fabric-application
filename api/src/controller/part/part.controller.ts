import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetAllPartService } from 'src/usecase/part/getAllPart.service';
import { InitPartService } from 'src/usecase/part/initPartService';

@Controller('part')
export class PartController {
  constructor(
    private readonly getAllPartService: GetAllPartService,
    private readonly initPartService: InitPartService,
  ) {}
  @Get('/all')
  async getAllParts() {
    return this.getAllPartService.call();
  }

  @Post('/init')
  async init() {
    return this.initPartService.call();
  }
}
