import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsStrongPassword, Max, Min } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @Min(3)
    @Max(20)
    @ApiProperty({ description: "user's first name" })
    first_name: string;

    @IsOptional()
    @Min(3)
    @Max(20)
    @ApiProperty({ required: false, description: "user's last name" })
    last_name: string;

    @IsEmail()
    @ApiProperty({
        description: "user's email. Must be a valid email address"
    })
    email: string;

    @IsStrongPassword()
    @ApiProperty({ description: "user's password. Must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol" })
    password: string;
}
