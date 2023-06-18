import { LoginDto } from './dto/login.dto';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from './entity/auth.entity';
import { Public } from '../lib/decorators/public-endpoint.decorator';
import { SignUpDto } from './dto/signup.dto';
import { UserService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { Response } from 'express';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  @Post('login')
  @Public()
  @ApiCreatedResponse({ type: String })
  async login(@Body() { email, password }: LoginDto, @Res({ passthrough: true }) res) {
    const { accessToken } = await this.authService.login(email, password);
    res.cookie('shopwise_token', 'Bearer ' + accessToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 14 * 24 * 60 * 60 * 1000 }); // 14 days
    return "Authenticated";
  }

  @Post('signup')
  @Public()
  @ApiCreatedResponse({ description: 'The user has been successfully created.', type: UserEntity })
  async createUser(@Body() SignUpDto: SignUpDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.userService.createUser(SignUpDto);
    const token = await this.authService.signToken(user.id);

    res.cookie('shopwise_token', 'Bearer ' + token, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 14 * 24 * 60 * 60 * 1000 }); // 14 days

    return new UserEntity(user);
  }
}