import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { RawmaterialService } from './rawmaterial.service';
import { CreateRawMaterialDto } from './dto/create-rawmaterial.dto';
import { UpdateRawmaterialDto } from './dto/update-rawmaterial.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('rawmaterial')
export class RawmaterialController {
  constructor(private readonly rawmaterialService: RawmaterialService) {}

  @Roles(Role.Admin, Role.RawMaterial, Role.CreateRawMaterial)
  @Post()
  async create(@Body() createRawmaterialDto: CreateRawMaterialDto) {
    const schema = CreateRawMaterialDto.prototype.generateYupSchema();
    try {
      await schema.validate(createRawmaterialDto);
    } catch (error: any) {
      throw new BadRequestException(error.errors);
    }

    const data =
      CreateRawMaterialDto.prototype.formatBody(createRawmaterialDto);
    return this.rawmaterialService.create(data);
  }

  @Roles(Role.Admin, Role.RawMaterial, Role.ViewRawMaterial)
  @Get()
  findAll(@Query('company') company: string, @Query('stocks') stocks: string) {
    return this.rawmaterialService.findAll({
      where: {
        companyId: company,
      },
      select: {
        id: true,
        name: true,
        unit: true,
        quantity: true,
        stocks: Boolean(stocks)
          ? {
              select: {
                id: true,
                quantity: true,
                unitCost: true,
                batch: true,
                supplier: true,
                expirationDate: true,
                rawMaterialId: true,
              },
            }
          : false,
      },
    });
  }

  @Roles(Role.Admin, Role.RawMaterial, Role.ViewRawMaterial)
  @Get(':id')
  findOne(@Param('id') id: string, @Query('stock') stock: string) {
    return this.rawmaterialService.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        unit: true,
        stocks: Boolean(stock)
          ? {
              select: {
                id: true,
                batch: true,
                quantity: true,
                supplier: true,
                expirationDate: true,
              },
            }
          : false,
      },
    });
  }

  @Roles(Role.Admin, Role.RawMaterial, Role.UpdateRawMaterial)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRawmaterialDto: UpdateRawmaterialDto,
  ) {
    return this.rawmaterialService.update(id, updateRawmaterialDto);
  }

  @Roles(Role.Admin, Role.RawMaterial, Role.DeleteRawMaterial)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rawmaterialService.remove(id);
  }
}
