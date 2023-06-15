import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { ApiOkResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserEmailDto } from './dto/update-user-email.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiCreatedResponse({ description: 'The user has been successfully created.', type: UserEntity })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.userService.createUser(createUserDto));
  }

  @Get()
  @ApiOkResponse({ type: [UserEntity] })
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return users.map(user => new UserEntity(user));
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.userService.getUser({ id }));
  }
  @ApiOkResponse({ type: UserEntity })
  @Patch('update_info/:id')
  async updateUserInfo(@Param('id', ParseIntPipe) id: number, @Body() updateUserInfoDto: UpdateUserInfoDto) {
    return new UserEntity(await this.userService.updateUserInfo(id, updateUserInfoDto));
  }
  @ApiOkResponse({ type: UserEntity })
  @Patch('update_password/:id')
  async updateUserPassword(@Param('id', ParseIntPipe) id: number, @Body() updateUserPasswordDto: UpdateUserPasswordDto) {
    return new UserEntity(await this.userService.updateUserPassword(id, updateUserPasswordDto));
  }

  @ApiOkResponse({ type: UserEntity })
  @Patch('update_email/:id')
  async updateUserEmail(@Param('id', ParseIntPipe) id: number, @Body() updateUserEmailDto: UpdateUserEmailDto) {
    return new UserEntity(await this.userService.updateUserEmail(id, updateUserEmailDto));
  }

  @ApiOkResponse({ type: UserEntity })
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.userService.deleteUser(id));
  }
}
