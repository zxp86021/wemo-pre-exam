import {
  Controller,
  Get,
  Req,
  Post,
  Query,
  Body,
  Put,
  Param,
  Delete,
  HttpCode, HttpException, HttpStatus,
} from '@nestjs/common';
import { CreateBikeDto } from '../DTO/create-bike.dto';
import { UpdateBikeDto } from '../DTO/update-bike.dto';
import { BikesService } from './bikes.service';

@Controller('bikes')
export class BikesController {
  constructor(private serv: BikesService) {}

  @Get()
  async findAll() {
    return await this.serv.findAll();
  }

  @Get(':licensePlateNumber')
  async findOne(@Param('licensePlateNumber') licensePlateNumber: string) {
    const bike = await this.serv.findOne(licensePlateNumber);
    if (bike === undefined) {
      throw new HttpException({
        error: 'License Plate Number Not Exist!',
      }, HttpStatus.NOT_FOUND)
    }
    return bike;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() bike: CreateBikeDto) {
    return await this.serv.create(bike);
  }

  @Put(':licensePlateNumber')
  async update(@Param('licensePlateNumber') licensePlateNumber: string, @Body() bike: UpdateBikeDto) {
    return await this.serv.update(licensePlateNumber, bike);
  }

  @Delete(':licensePlateNumber')
  @HttpCode(204)
  remove(@Param('licensePlateNumber') licensePlateNumber: string) {
    this.serv.remove(licensePlateNumber);
  }
}
