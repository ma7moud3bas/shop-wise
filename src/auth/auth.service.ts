import { Auth } from './entity/auth.entity';
import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/users.service';
@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async login(email: string, password: string): Promise<Auth> {
        const user = await this.userService.getUser({ email })
        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`);
        }
        const isPasswordValid = bcrypt.compare(password, user.password_hash).then((result) => result);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        return {
            accessToken: this.jwtService.sign({ userId: user.id }),
        };
    }


    validateUserSession(userId: string) {
        return this.userService.getUser({ id: Number(userId) });
    }

}