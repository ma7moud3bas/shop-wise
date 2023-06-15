import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserEmailDto } from './dto/update-user-email.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }
  async createUser(createUserDto: CreateUserDto) {
    const { password, ...data } = createUserDto
    return this.prisma.user.create({
      data: { ...data, password_hash: password },
    })
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUser(user: Prisma.UserWhereUniqueInput) {
    const userData: User = await this.prisma.user.findUnique({
      where: user,
    })
    if (!userData) {
      throw new NotFoundException('User not found')
    }

    return userData
  }

  updateUserInfo(id: number, updateUserDto: UpdateUserInfoDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  updateUserPassword(id: number, updateUserDto: UpdateUserPasswordDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  updateUserEmail(id: number, updateUserDto: UpdateUserEmailDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id },
      include: { Carts: true, Orders: true, UserAddresses: true, UserPayments: true },
    })
  }

}
