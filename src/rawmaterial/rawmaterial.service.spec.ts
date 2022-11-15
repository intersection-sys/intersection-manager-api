import { Test, TestingModule } from '@nestjs/testing';
import { RawmaterialService } from './rawmaterial.service';

describe('RawmaterialService', () => {
  let service: RawmaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RawmaterialService],
    }).compile();

    service = module.get<RawmaterialService>(RawmaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
