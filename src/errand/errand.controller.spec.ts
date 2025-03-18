import { Test, TestingModule } from '@nestjs/testing';
import { ErrandController } from './errand.controller';

describe('ErrandController', () => {
  let controller: ErrandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ErrandController],
    }).compile();

    controller = module.get<ErrandController>(ErrandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
