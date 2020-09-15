import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bike } from '../database/entities/bike.entity';

@Injectable()
export class BikesService {
  constructor(
    @InjectRepository(Bike)
    private bikeRepository: Repository<Bike>,
  ) {}

  findAll(): Promise<Bike[]> {
    return this.bikeRepository.find();
  }

  findOne(licensePlateNumber: string): Promise<Bike> {
    return this.bikeRepository.findOne(licensePlateNumber);
  }

  async remove(licensePlateNumber: string): Promise<void> {
    await this.bikeRepository.delete(licensePlateNumber);
  }
}
