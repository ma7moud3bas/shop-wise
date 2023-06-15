import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsStrongPassword } from "class-validator";

export class UpdateUserPasswordDto {
    @IsNotEmpty()
    @IsStrongPassword()
    @ApiProperty({ description: "user's password. Must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol" })
    password: string;
}
