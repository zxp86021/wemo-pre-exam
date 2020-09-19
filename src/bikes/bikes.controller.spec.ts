import { Test, TestingModule } from '@nestjs/testing';
import { BikesController } from './bikes.controller';
import { BikesService } from './bikes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Bike } from '../database/entities/bike.entity';
import { Repository } from 'typeorm';
import { CreateBikeDto } from '../DTO/create-bike.dto';
import { UpdateBikeDto } from '../DTO/update-bike.dto';

describe('BikesController', () => {
  let controller: BikesController;
  let service: BikesService;
  let repo: Repository<Bike>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BikesController],
      providers: [BikesService, {
        provide: getRepositoryToken(Bike),
        useClass: Repository,
      }],
    }).compile();

    controller = module.get<BikesController>(BikesController);
    service = module.get<BikesService>(BikesService);
    repo = module.get<Repository<Bike>>(getRepositoryToken(Bike));
  });

  describe('BikesController', () => {
    // mock file for reuse
    const testBikes: Bike[] =  [
      {
        licensePlateNumber: 'AAA-111',
        mileage: 0.00,
        brand: 'K',
        isActive: true
      },
      {
        licensePlateNumber: 'AQV-1234',
        mileage: 999.90,
        brand: 'S',
        isActive: false
      },
      {
        licensePlateNumber: 'AQV-1235',
        mileage: 100.00,
        brand: 'S',
        isActive: false
      }
    ];

    it('findAll: should return array of bikes', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(testBikes);
      expect(await service.findAll({})).toEqual(testBikes);
    });

    it('findOne: should return a bike', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(testBikes[0]);
      expect(await service.findOne('AAA-111')).toEqual(testBikes[0]);
    });

    it('create: should add a new bike', async () => {
      const params: CreateBikeDto = {
        licensePlateNumber: 'MMA-078',
        mileage: 99.99,
        brand: 'test',
        isActive: false
      };
      jest.spyOn(service, 'create').mockResolvedValue(params);
      expect(await service.create(params)).toEqual(params);
    });

    it('update: should return a updated bike', async () => {
      const originBike: Bike = {
        licensePlateNumber: 'AQV-1235',
        mileage: 100.00,
        brand: 'S',
        isActive: false
      };

      const params: UpdateBikeDto = {
        mileage: 199.99,
        isActive: true
      };

      const updatedBike: Bike = {
        licensePlateNumber: 'AQV-1235',
        mileage: 199.99,
        brand: 'S',
        isActive: true
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedBike);
      expect(await service.update(originBike.licensePlateNumber, params)).toEqual(updatedBike);
    });
  });
});
