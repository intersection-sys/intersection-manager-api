import { Test, TestingModule } from '@nestjs/testing';
import { RawmaterialController } from './rawmaterial.controller';
import { RawmaterialService } from './rawmaterial.service';

describe('RawmaterialController', () => {
  let controller: RawmaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RawmaterialController],
      providers: [RawmaterialService],
    }).compile();

    controller = module.get<RawmaterialController>(RawmaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
