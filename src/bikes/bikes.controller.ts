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
  create(@Body() createBikeDto: CreateBikeDto) {
    return `This action will add a new bike`;
  }

  @Put(':id')
  update(@Param('id') id: string) {
    //@Body() updateCatDto: UpdateCatDto
    return `This action updates a #${id} bike`;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return `This action removes a #${id} bike`;
  }
}
