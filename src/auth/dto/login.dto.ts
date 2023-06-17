import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @IsEmail()
    @ApiProperty({ example: "email@service.com" })
    email: string;

    @IsNotEmpty()
    @ApiProperty({ example: "Strong_Password123" })
    password: string;
}