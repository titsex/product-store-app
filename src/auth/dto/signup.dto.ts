import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SignupDto {
    @ApiProperty({ example: 'aravan962@gmail.com', description: 'The email to which the account will be registered' })
    @IsEmail()
    public email: string

    @ApiProperty({ example: '********', description: 'Account password' })
    @IsString()
    @IsNotEmpty()
    @Length(8)
    public password: string

    @ApiProperty({ example: 'Ravan', description: 'Account first name' })
    @IsString()
    @Length(2)
    public firstName: string

    @ApiProperty({ example: 'Abbasov', description: 'Account last name' })
    @IsString()
    @Length(2)
    public lastName: string
}
