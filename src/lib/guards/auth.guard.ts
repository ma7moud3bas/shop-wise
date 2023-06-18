import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from '../../users/users.service';
import { Role } from '../enums/user-roles.enum';
import { ROLES_KEY } from '../decorators/user-roles.decorator';
import { Reflector } from '@nestjs/core';
import { AuthPrivateKey } from '../constants';
import { IS_PUBLIC_KEY } from '../decorators/public-endpoint.decorator';

// this guard is used to handle authentication and authorization

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private readonly userService: UserService,
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        // check route is public
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;

        const token = this.extractTokenFromHeader(request);

        // check if token exists
        if (!token) {
            throw new UnauthorizedException();
        }

        // check if token valid
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: AuthPrivateKey,
                }
            );
            request['user'] = payload;
        } catch (err) {
            throw new UnauthorizedException();
        }

        // check if user exists in database
        const user = await this.userService.getUser({ id: request.user.userId });
        if (!user) throw new UnauthorizedException({ message: 'User not found' });

        // check if user has required role
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        if (!requiredRoles.includes(user.role)) {
            throw new UnauthorizedException({ message: 'You do not have permission to access this resource' });
        };


        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}