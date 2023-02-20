import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SigninDto {
    @ApiProperty({ example: 'aravan962@gmail.com', description: 'Login email' })
    @IsEmail()
    public email: string

    @ApiProperty({ example: '********', description: 'Login password' })
    @IsString()
    @IsNotEmpty()
    @Length(8)
    public password: string
}
