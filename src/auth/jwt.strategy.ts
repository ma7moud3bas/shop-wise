import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthPrivateKey } from '../lib/contstants';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private auth: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: AuthPrivateKey,
        });
    }

    async validate(payload: { userId: string }) {
        const user = await this.auth.validateUser(payload.userId);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}