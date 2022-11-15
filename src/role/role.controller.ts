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
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Roles(Role.Admin)
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    const schema = CreateRoleDto.prototype.generateYupSchema();
    try {
      await schema.validate(createRoleDto);
    } catch (error: any) {
      throw new BadRequestException(error.errors);
    }

    const data = CreateRoleDto.prototype.formatBody(createRoleDto);
    return this.roleService.create(data);
  }

  @Roles(Role.Admin)
  @Get()
  findAll(@Query('company') company: string) {
    return this.roleService.findAll({
      where: {
        companyId: company,
      },
      select: {
        id: true,
        name: true,
        access: true,
      },
    });
  }

  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
