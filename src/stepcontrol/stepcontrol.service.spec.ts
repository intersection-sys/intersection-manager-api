import { Test, TestingModule } from '@nestjs/testing';
import { StepcontrolService } from './stepcontrol.service';

describe('StepcontrolService', () => {
  let service: StepcontrolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StepcontrolService],
    }).compile();

    service = module.get<StepcontrolService>(StepcontrolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
