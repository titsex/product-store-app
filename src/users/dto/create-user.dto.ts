import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'
import { Optional } from '@nestjs/common'

export class CreateUserDto {
    @IsEmail()
    public email: string

    @IsString()
    @IsNotEmpty()
    @Length(8)
    @Optional()
    public password?: string

    @IsString()
    @Length(2)
    public firstName: string

    @IsString()
    @Length(2)
    @Optional()
    public lastName?: string
}
