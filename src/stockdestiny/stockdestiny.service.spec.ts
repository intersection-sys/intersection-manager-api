import { Test, TestingModule } from '@nestjs/testing';
import { StockdestinyService } from './stockdestiny.service';

describe('StockdestinyService', () => {
  let service: StockdestinyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockdestinyService],
    }).compile();

    service = module.get<StockdestinyService>(StockdestinyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
