import { Test, TestingModule } from '@nestjs/testing';
import { ProductionorderController } from './productionorder.controller';
import { ProductionorderService } from './productionorder.service';

describe('ProductionorderController', () => {
  let controller: ProductionorderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductionorderController],
      providers: [ProductionorderService],
    }).compile();

    controller = module.get<ProductionorderController>(ProductionorderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
