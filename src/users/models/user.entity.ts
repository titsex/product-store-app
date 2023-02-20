import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IsEmail, IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

@Entity('users')
export class UserEntity {
    @ApiProperty({ example: 1, description: 'Primary user key' })
    @PrimaryGeneratedColumn()
    public readonly id: number

    @ApiProperty({ example: new Date(), description: 'Account creation date' })
    @CreateDateColumn()
    public readonly createdAt: Date

    @ApiProperty({ example: 'aravan962@gmail.com', description: "User's email" })
    @IsEmail()
    @Column()
    public email: string

    @ApiProperty({ example: '********', description: "User's password" })
    @IsString()
    @Length(8)
    @Column()
    public password: string

    @ApiProperty({ example: 1, description: "User's first name" })
    @IsString()
    @Length(2)
    @Column()
    public firstName: string

    @ApiProperty({ example: 1, description: "User's last name" })
    @IsString()
    @Length(2)
    @Column()
    public lastName: string
}
