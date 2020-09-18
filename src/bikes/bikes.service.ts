import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bike } from '../database/entities/bike.entity';
import { CreateBikeDto } from '../DTO/create-bike.dto';
import { UpdateBikeDto } from '../DTO/update-bike.dto';

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

  create(createBikeDto: CreateBikeDto): Promise<Bike> {
    const bike = new CreateBikeDto();
    bike.licensePlateNumber = createBikeDto.licensePlateNumber;
    bike.brand = createBikeDto.brand;
    bike.mileage = createBikeDto.mileage;
    bike.isActive = createBikeDto.isActive;

    return this.bikeRepository.save(bike);
  }

  update(
    licensePlateNumber: string,
    updateBikeDto: UpdateBikeDto,
  ): Promise<Bike> {
    const bike = new UpdateBikeDto();
    bike.mileage = updateBikeDto.mileage;
    bike.isActive = updateBikeDto.isActive;

    this.bikeRepository.update(licensePlateNumber, bike);

    return this.bikeRepository.findOne(licensePlateNumber);
  }

  async remove(licensePlateNumber: string): Promise<void> {
    await this.bikeRepository.delete(licensePlateNumber);
  }
}
