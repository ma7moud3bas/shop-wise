import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Role } from 'src/lib/enums/user-roles.enum';

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
    @Exclude()
    role: Role;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}