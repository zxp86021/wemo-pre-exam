import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { BikesController } from '../src/bikes/bikes.controller';
import { BikesService } from '../src/bikes/bikes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Bike } from '../src/database/entities/bike.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateBikeDto } from '../src/DTO/create-bike.dto';
import { UpdateBikeDto } from '../src/DTO/update-bike.dto';

describe('BikesController (e2e)', () => {
  let app: INestApplication;
  let service: BikesService;
  let repo: Repository<Bike>

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [BikesController],
      providers: [BikesService, {
        provide: getRepositoryToken(Bike),
        useClass: Repository,
      }]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    service = moduleFixture.get<BikesService>(BikesService);
    repo = moduleFixture.get<Repository<Bike>>(getRepositoryToken(Bike));
  });

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

  it('GET /bikes', async () => {
    jest.spyOn(repo, 'find').mockResolvedValueOnce(testBikes);
    return request(app.getHttpServer())
      .get('/bikes')
      .expect(200)
      .expect(testBikes);
  });

  it('GET /bikes/{licensePlateNumber}', async () => {
    const testData = testBikes[1];
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(testData);
    return request(app.getHttpServer())
      .get(`/bikes/${testData.licensePlateNumber}`)
      .expect(200)
      .expect(testData);
  });

  it('GET Not Found /bikes/{licensePlateNumber}', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(undefined);
    return request(app.getHttpServer())
      .get('/bikes/not-exist')
      .expect(404)
      .expect({error: 'Bike Not Exist!'});
  });

  it('POST /bikes', async () => {
    const params: CreateBikeDto = {
      licensePlateNumber: 'MMA-078',
      mileage: 99.99,
      brand: 'test',
      isActive: false
    };

    jest.spyOn(repo, 'save').mockResolvedValueOnce(params);
    return request(app.getHttpServer())
      .post('/bikes')
      .set('Accept', 'application/json')
      .send(params)
      .expect(201)
      .expect(params);
  });

  it('POST Request Validate Failed /bikes', async () => {
    const params: CreateBikeDto = {
      licensePlateNumber: 'MMA-978',
      mileage: -99.99,
      brand: 'test',
      isActive: false
    };

    return request(app.getHttpServer())
      .post('/bikes')
      .set('Accept', 'application/json')
      .send(params)
      .expect(400);
  });

  it('PUT /bikes/{licensePlateNumber}', async () => {
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
    return request(app.getHttpServer())
      .put(`/bikes/${updatedBike.licensePlateNumber}`)
      .set('Accept', 'application/json')
      .send(params)
      .expect(200)
      .expect(updatedBike);
  });

  it('PUT Request Validate Failed /bikes/{licensePlateNumber}', async () => {
    const params: UpdateBikeDto = {
      mileage: -199.99,
      isActive: true
    };

    const updatedBike: Bike = {
      licensePlateNumber: 'AQV-1235',
      mileage: -199.99,
      brand: 'S',
      isActive: true
    };

    return request(app.getHttpServer())
      .put(`/bikes/${updatedBike.licensePlateNumber}`)
      .set('Accept', 'application/json')
      .send(params)
      .expect(400);
  });

  it('DELETE /bikes/{licensePlateNumber}', async () => {
    jest.spyOn(service, 'remove').mockResolvedValueOnce();
    return request(app.getHttpServer())
      .delete('/bikes/to-be-delete')
      .expect(204);
  });

  afterAll(async () => {
    await app.close();
  });
});
