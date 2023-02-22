import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateUserDto {
    @IsEmail()
    public email: string

    @IsString()
    @IsNotEmpty()
    @Length(8)
    public password: string

    @IsString()
    @Length(2)
    public firstName: string

    @IsString()
    @Length(2)
    public lastName: string
}
