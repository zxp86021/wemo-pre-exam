import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, LessThan, MoreThan, Repository } from 'typeorm';
import { Bike } from '../database/entities/bike.entity';
import { CreateBikeDto } from '../DTO/create-bike.dto';
import { UpdateBikeDto } from '../DTO/update-bike.dto';

@Injectable()
export class BikesService {
  constructor(
    @InjectRepository(Bike)
    private bikeRepository: Repository<Bike>,
  ) {}

  findAll(query): Promise<Bike[]> {
    const findCondition = {};

    if (query.brand) {
      findCondition['brand'] = Equal(query.brand);
    }
    if (query.mileage_gt) {
      findCondition['mileage'] = MoreThan(query.mileage_gt);
    }
    if (query.mileage_lt) {
      findCondition['mileage'] = LessThan(query.mileage_lt);
    }
    if (query.is_active) {
      let boolActive;

      if (query.is_active === 'true') {
        boolActive = true;
      } else if (query.is_active === 'false') {
        boolActive = false;
      } else {
        boolActive = Boolean(query.is_active);
      }

      findCondition['isActive'] = Equal(boolActive);
    }

    console.log(findCondition);

    return this.bikeRepository.find(findCondition);
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
