import { Test, TestingModule } from '@nestjs/testing';
import { BikesService } from './bikes.service';

describe('BikesService', () => {
  let service: BikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BikesService],
    }).compile();

    service = module.get<BikesService>(BikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
