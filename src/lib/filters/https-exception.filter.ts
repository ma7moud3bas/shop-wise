import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const message = exception.message.replace(/\n/g, '');
        const cause = exception.getResponse()['message'];
        response
            .status(status)
            .json({
                success: false,
                statusCode: status,
                data: null,
                message: message,
                cause,
                path: request.url,
            });
    }
}