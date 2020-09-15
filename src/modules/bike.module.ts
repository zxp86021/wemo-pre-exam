import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BikesService } from '../bikes/bikes.service';
import { BikesController } from '../bikes/bikes.controller';
import { Bike } from '../database/entities/bike.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bike])],
  providers: [BikesService],
  controllers: [BikesController],
  exports: [TypeOrmModule],
})
export class BikeModule {}
