import { LoginDto } from './dto/login.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from './entity/auth.entity';
import { Public } from '../lib/decorators/public-endpoint.decorator';
import { SignUpDto } from './dto/signup.dto';
import { UserService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  @Post('login')
  @Public()
  @ApiOkResponse({ type: Auth })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Post('signup')
  @Public()
  @ApiCreatedResponse({ description: 'The user has been successfully created.', type: UserEntity })
  async createUser(@Body() SignUpDto: SignUpDto) {
    return new UserEntity(await this.userService.createUser(SignUpDto));
  }
}