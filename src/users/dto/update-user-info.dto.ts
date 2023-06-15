
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, Max, MaxLength, Min, MinLength } from "class-validator";

export class UpdateUserInfoDto {
    @IsOptional()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty({ required: false, description: "user's first name" })
    first_name: string;

    @IsOptional()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty({ required: false, description: "user's last name" })
    last_name: string;
}
