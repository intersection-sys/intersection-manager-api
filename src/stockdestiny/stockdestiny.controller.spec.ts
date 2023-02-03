import { Test, TestingModule } from '@nestjs/testing';
import { StockdestinyController } from './stockdestiny.controller';
import { StockdestinyService } from './stockdestiny.service';

describe('StockdestinyController', () => {
  let controller: StockdestinyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockdestinyController],
      providers: [StockdestinyService],
    }).compile();

    controller = module.get<StockdestinyController>(StockdestinyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
