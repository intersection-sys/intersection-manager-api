import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StockDestinyService } from './stockdestiny.service';
import { CreateStockDestinyDto } from './dto/create-stockdestiny.dto';
import { UpdateStockdestinyDto } from './dto/update-stockdestiny.dto';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Query } from '@nestjs/common/decorators';

@Controller('stockdestiny')
export class StockdestinyController {
  constructor(private readonly stockdestinyService: StockDestinyService) {}

  @Post()
  async create(@Body() body: CreateStockDestinyDto) {
    const schema = CreateStockDestinyDto.prototype.generateYupSchema();
    try {
      await schema.validate(body);
    } catch (error: any) {
      throw new BadRequestException(error.errors);
    }

    const data = CreateStockDestinyDto.prototype.formatBody(body);
    return this.stockdestinyService.create(data);
  }

  @Get()
  findAll(@Query('stockid') stockId: string) {
    if (!stockId) throw new BadRequestException('Invalid raw material');
    return this.stockdestinyService.findAll({
      where: {
        stockId,
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockdestinyService.findOne({
      where: {
        id,
      },
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStockdestinyDto: UpdateStockdestinyDto,
  ) {
    return this.stockdestinyService.update(id, updateStockdestinyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockdestinyService.remove(id);
  }
}
