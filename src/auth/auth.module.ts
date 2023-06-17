import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthPrivateKey } from '../lib/contstants';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    UsersModule,
    JwtModule.register({
      secret: AuthPrivateKey,
      signOptions: { expiresIn: '14d' }, // e.g. 7d, 24h 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [AuthService],
})
export class AuthModule { }