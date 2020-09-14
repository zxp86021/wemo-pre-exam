import { Controller, Get, Req, Post, Query, Body, Put, Param, Delete, HttpCode } from '@nestjs/common';

@Controller('bikes')
export class BikesController {
  @Get()
  findAll(@Query() query): string {
    return 'This action returns all bikes';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} bike`;
  }

  @Post()
  @HttpCode(201)
  create(): string {
    return 'This action adds a new bike';
  }

  @Put(':id')
  update(@Param('id') id: string, ) {//@Body() updateCatDto: UpdateCatDto
    return `This action updates a #${id} bike`;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return `This action removes a #${id} bike`;
  }
}
