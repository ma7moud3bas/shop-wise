import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
}

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        return next.handle().pipe(map(data => ({ success: true, statusCode: response.statusCode, data })));
    }
}