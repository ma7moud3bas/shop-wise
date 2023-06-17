import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { ApiOkResponse, ApiCreatedResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserEmailDto } from './dto/update-user-email.dto';
import { UserEntity } from './entities/user.entity';
import { Public } from '../lib/decorators/public-endpoint.decorator';
import { Roles } from '../lib/decorators/user-roles.decorator';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @ApiOkResponse({ type: [UserEntity] })
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return users.map(user => new UserEntity(user));
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  @Roles(['ADMIN', 'USER'])
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
