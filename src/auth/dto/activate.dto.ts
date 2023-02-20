import { IsEmail, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ActivateDto {
    @ApiProperty({ example: 'aravan962@gmail.com', description: 'Email in need of confirmation' })
    @IsEmail()
    public email: string

    @ApiProperty({ example: 'f0a49ab2ac01e12dad3beb', description: 'Email confirmation string' })
    @IsNotEmpty()
    public unique: string
}
