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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin, Role.User, Role.CreateUser)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const schema = CreateUserDto.prototype.generateYupSchema();
    try {
      await schema.validate(createUserDto);
    } catch (error: any) {
      throw new BadRequestException(error.errors);
    }

    const data = CreateUserDto.prototype.formatBody(createUserDto);
    return this.userService.create(data);
  }

  @Roles(Role.Admin, Role.User)
  @Get()
  findAll(@Query('company') company: string, @Query('role') role: string) {
    return this.userService.findAll({
      where: {
        companyId: company,
      },
      select: {
        id: true,
        name: true,
        username: true,
        accessKey: true,
        imageUrl: true,
        additionalInfo: true,
        role: Boolean(role)
          ? { select: { id: true, name: true, access: true } }
          : false,
      },
    });
  }

  @Roles(Role.Admin, Role.User, Role.ViewUser)
  @Get(':id')
  findOne(@Param('id') id: string, @Query('role') role: string) {
    return this.userService.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        accessKey: true,
        imageUrl: true,
        additionalInfo: true,
        companyId: true,
        role: Boolean(role)
          ? { select: { id: true, name: true, access: true } }
          : false,
      },
    });
  }

  @Roles(Role.Admin, Role.Stock, Role.ViewStock)
  @Get('search/:query')
  search(@Param('query') query: string) {
    return this.userService.searchUser(query);
  }

  @Roles(Role.Admin, Role.User, Role.UpdateUser)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Roles(Role.Admin, Role.User, Role.DeleteUser)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
