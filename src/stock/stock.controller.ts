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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Roles(Role.Admin, Role.RawMaterial, Role.Stock, Role.CreateStock)
  @UseInterceptors(FilesInterceptor('qualityTest'))
  @Post()
  async create(
    @Body() body: CreateStockDto,
    @UploadedFiles() qualityTest?: Express.Multer.File[],
  ) {
    const schema = CreateStockDto.prototype.generateYupSchema();
    try {
      await schema.validate(body);
    } catch (error: any) {
      throw new BadRequestException(error.errors);
    }

    const data = CreateStockDto.prototype.formatBody(body);
    return this.stockService.create(data, qualityTest || []);
  }

  @Roles(Role.Admin, Role.RawMaterial, Role.Stock, Role.ViewStock)
  @Get()
  findAll(@Query('company') company: string) {
    return this.stockService.findAll({
      where: {
        companyId: company,
      },
      select: {
        id: true,
        quantity: true,
        cost: true,
        batch: true,
        supplier: true,
        expirationDate: true,
        rawMaterialId: true,
      },
    });
  }

  @Roles(Role.Admin, Role.RawMaterial, Role.Stock, Role.ViewStock)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('stockDestiny') stockDestiny?: string,
    @Query('qualityTests') qualityTests?: string,
  ) {
    return this.stockService.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        supplier: true,
        batch: true,
        invoiceNumber: true,
        expirationDate: true,
        cost: true,
        quantity: true,
        used: true,
        remaining: true,
        rawMaterial: {
          select: {
            id: true,
            name: true,
            unit: true,
          },
        },
        stockDestinies: Boolean(stockDestiny),
        qualityTests: Boolean(qualityTests),
      },
    });
  }

  @Roles(Role.Admin, Role.Stock, Role.ViewStock)
  @Get('search/:query')
  search(@Param('query') query: string) {
    return this.stockService.searchStock(query);
  }

  @Roles(Role.Admin, Role.RawMaterial, Role.Stock, Role.UpdateStock)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(id, updateStockDto);
  }

  @Roles(Role.Admin, Role.RawMaterial, Role.Stock, Role.DeleteStock)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(id);
  }

  @Roles(Role.Admin, Role.RawMaterial, Role.Stock, Role.DeleteStock)
  @Delete('/qualitytest/:id')
  removeQualityTest(@Param('id') id: string) {
    return this.stockService.deleteQualityTests([id]);
  }

  @Roles(Role.Admin, Role.RawMaterial, Role.Stock, Role.DeleteStock)
  @Post('qualitytest/:id')
  @UseInterceptors(FilesInterceptor('qualityTestFiles'))
  uploadQualityTest(
    @Param('id') id: string,
    @UploadedFiles() qualityTestFiles?: Express.Multer.File[],
  ) {
    return this.stockService.uploadQualityTests(
      { stock: { connect: { id } } },
      qualityTestFiles,
    );
  }
}
