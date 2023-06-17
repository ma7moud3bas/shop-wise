import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserEmailDto } from './dto/update-user-email.dto';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from 'src/auth/dto/signup.dto';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }
  async createUser(signUpDto: SignUpDto) {
    const { password, ...data } = signUpDto

    const password_hash = await bcrypt.hash(password, 10)

    return this.prisma.user.create({
      data: { ...data, password_hash: password_hash },
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
