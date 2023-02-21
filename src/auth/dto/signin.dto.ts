import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class SigninDto {
    @IsEmail()
    public email: string

    @IsString()
    @IsNotEmpty()
    @Length(8)
    public password: string
}
