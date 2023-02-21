import { IsEmail, IsNotEmpty } from 'class-validator'

export class ActivateDto {
    @IsEmail()
    public email: string

    @IsNotEmpty()
    public unique: string

    public ip: string

    public userAgent: string
}
