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
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    const schema = CreateCompanyDto.prototype.generateYupSchema();
    try {
      await schema.validate(createCompanyDto);
    } catch (error: any) {
      throw new BadRequestException(error.errors);
    }

    const data = CreateCompanyDto.prototype.formatBody(createCompanyDto);
    return this.companyService.create(data, createCompanyDto.password);
  }

  @Roles(Role.DEV)
  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Roles(Role.Admin)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('key') key?: string,
    @Query('roles') roles?: string,
    @Query('users') users?: string,
  ) {
    return this.companyService.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        CNPJ: true,
        additionalInfo: true,
        key: Boolean(key),
        roles: Boolean(roles)
          ? {
              select: {
                id: true,
                name: true,
                access: true,
              },
            }
          : false,
        users: Boolean(users)
          ? {
              select: {
                id: true,
                name: true,
                username: true,
                accessKey: true,
                imageUrl: true,
                additionalInfo: true,
              },
            }
          : false,
      },
    });
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    const data = {
      name: updateCompanyDto.name,
      password: updateCompanyDto.password,
      CNPJ: updateCompanyDto.CNPJ,
      additionalInfo: updateCompanyDto.additionalInfo || null,
    };
    return this.companyService.update(id, data);
  }

  @Roles(Role.DEV)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
