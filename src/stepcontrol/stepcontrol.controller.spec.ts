import { Test, TestingModule } from '@nestjs/testing';
import { StepcontrolController } from './stepcontrol.controller';
import { StepcontrolService } from './stepcontrol.service';

describe('StepcontrolController', () => {
  let controller: StepcontrolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StepcontrolController],
      providers: [StepcontrolService],
    }).compile();

    controller = module.get<StepcontrolController>(StepcontrolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
