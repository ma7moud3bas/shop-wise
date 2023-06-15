import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: "Mahmoud" })
    first_name: string;

    @ApiProperty({ required: false, example: "Abbas" })
    last_name: string | null;

    @ApiProperty({ example: "mahmoudmohammad717@gmail.com" })
    email: string;

    @Exclude()
    password_hash: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}