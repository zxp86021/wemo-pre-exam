import { Test, TestingModule } from '@nestjs/testing';
import { BikesController } from './bikes.controller';

describe('BikesController', () => {
  let controller: BikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BikesController],
    }).compile();

    controller = module.get<BikesController>(BikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
