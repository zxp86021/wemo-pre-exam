import { Test, TestingModule } from '@nestjs/testing';
import { BikesController } from './bikes.controller';
import { BikesService } from './bikes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Bike } from '../database/entities/bike.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateBikeDto } from '../DTO/create-bike.dto';
import { UpdateBikeDto } from '../DTO/update-bike.dto';

describe('BikesService', () => {
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
      jest.spyOn(repo, 'find').mockResolvedValueOnce(testBikes);
      expect(await service.findAll({})).toBe(testBikes);
    });

    it('findAll with query: should return filtered array of bikes', async () => {
      const filteredBikes = testBikes.filter(bike => bike.mileage < 150);
      const query = {
        mileage_lt: 150
      };
      jest.spyOn(repo, 'find').mockResolvedValueOnce(filteredBikes);
      expect(await service.findAll(query)).toBe(filteredBikes);
    });

    it('findOne: should return a bike', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(testBikes[0]);
      expect(await service.findOne('AAA-111')).toBe(testBikes[0]);
    });

    it('create: should add a new bike', async () => {
      const params: CreateBikeDto = {
        licensePlateNumber: 'MMA-078',
        mileage: 99.99,
        brand: 'test',
        isActive: false
      };
      jest.spyOn(repo, 'save').mockResolvedValueOnce(params);
      expect(await service.create(params)).toBe(params);
    });

    it('update: should return a updated bike', async () => {
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

      jest.spyOn(repo, 'update').mockResolvedValueOnce(new UpdateResult());
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(updatedBike);
      expect(await service.update(updatedBike.licensePlateNumber, params)).toBe(updatedBike);
    });
  });
});
