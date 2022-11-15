import { Injectable } from '@nestjs/common';
import { CreateProductionorderDto } from './dto/create-productionorder.dto';
import { UpdateProductionorderDto } from './dto/update-productionorder.dto';

@Injectable()
export class ProductionorderService {
  create(createProductionorderDto: CreateProductionorderDto) {
    return 'This action adds a new productionorder';
  }

  findAll() {
    return `This action returns all productionorder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productionorder`;
  }

  update(id: number, updateProductionorderDto: UpdateProductionorderDto) {
    return `This action updates a #${id} productionorder`;
  }

  remove(id: number) {
    return `This action removes a #${id} productionorder`;
  }
}
