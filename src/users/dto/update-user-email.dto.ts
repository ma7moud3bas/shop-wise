import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateUserEmailDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: "user's email. Must be a valid email address"
    })
    email: string;
}
