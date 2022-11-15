import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  async create(@Body() body: CreateStockDto) {
    const schema = CreateStockDto.prototype.generateYupSchema();
    try {
      await schema.validate(body);
    } catch (error: any) {
      throw new BadRequestException(error.errors);
    }

    const data = CreateStockDto.prototype.formatBody(body);
    return this.stockService.create(data);
  }

  @Get()
  findAll(@Query('company') company: string) {
    return this.stockService.findAll({
      where: {
        companyId: company,
      },
      select: {
        id: true,
        quantity: true,
        unitCost: true,
        batch: true,
        supplier: true,
        expirationDate: true,
        rawMaterialId: true,
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(id);
  }
}
