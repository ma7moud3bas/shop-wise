
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsStrongPassword, Max, Min } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @Min(3)
    @Max(20)
    @ApiProperty({ required: false, description: "user's first name" })
    first_name: string;

    @IsOptional()
    @Min(3)
    @Max(20)
    @ApiProperty({ required: false, description: "user's last name" })
    last_name: string;
}
