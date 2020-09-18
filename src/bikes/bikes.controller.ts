import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateBikeDto } from '../DTO/create-bike.dto';
import { UpdateBikeDto } from '../DTO/update-bike.dto';
import { BikesService } from './bikes.service';

@Controller('bikes')
export class BikesController {
  constructor(private serv: BikesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all bikes' })
  @ApiResponse({ status: 200, description: 'Success.' })
  async findAll() {
    return await this.serv.findAll();
  }

  @Get(':licensePlateNumber')
  @ApiOperation({ summary: 'Get specific bike' })
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 404, description: 'Bike Not Exist.' })
  async findOne(@Param('licensePlateNumber') licensePlateNumber: string) {
    const bike = await this.serv.findOne(licensePlateNumber);
    if (bike === undefined) {
      throw new HttpException(
        {
          error: 'Bike Not Exist!',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return bike;
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create bike' })
  @ApiResponse({ status: 201, description: 'Bike Created.' })
  @ApiResponse({ status: 400, description: 'Request Validate Failed.' })
  async create(@Body() bike: CreateBikeDto) {
    return await this.serv.create(bike);
  }

  @Put(':licensePlateNumber')
  @ApiOperation({ summary: 'Update bike data' })
  @ApiResponse({ status: 200, description: 'Bike data updated.' })
  @ApiResponse({ status: 400, description: 'Request Validate Failed.' })
  async update(
    @Param('licensePlateNumber') licensePlateNumber: string,
    @Body() bike: UpdateBikeDto,
  ) {
    return await this.serv.update(licensePlateNumber, bike);
  }

  @Delete(':licensePlateNumber')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove specific bike' })
  @ApiResponse({ status: 204, description: 'Remove Success.' })
  remove(@Param('licensePlateNumber') licensePlateNumber: string) {
    this.serv.remove(licensePlateNumber);
  }
}
