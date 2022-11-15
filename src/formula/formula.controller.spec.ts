import { Test, TestingModule } from '@nestjs/testing';
import { FormulaController } from './formula.controller';
import { FormulaService } from './formula.service';

describe('FormulaController', () => {
  let controller: FormulaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormulaController],
      providers: [FormulaService],
    }).compile();

    controller = module.get<FormulaController>(FormulaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
