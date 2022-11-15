import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductionorderService } from './productionorder.service';
import { CreateProductionorderDto } from './dto/create-productionorder.dto';
import { UpdateProductionorderDto } from './dto/update-productionorder.dto';

@Controller('productionorder')
export class ProductionorderController {
  constructor(private readonly productionorderService: ProductionorderService) {}

  @Post()
  create(@Body() createProductionorderDto: CreateProductionorderDto) {
    return this.productionorderService.create(createProductionorderDto);
  }

  @Get()
  findAll() {
    return this.productionorderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productionorderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductionorderDto: UpdateProductionorderDto) {
    return this.productionorderService.update(+id, updateProductionorderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productionorderService.remove(+id);
  }
}
