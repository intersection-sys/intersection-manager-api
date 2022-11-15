import { Test, TestingModule } from '@nestjs/testing';
import { ProductionorderService } from './productionorder.service';

describe('ProductionorderService', () => {
  let service: ProductionorderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionorderService],
    }).compile();

    service = module.get<ProductionorderService>(ProductionorderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
