import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IsEmail, IsString, Length } from 'class-validator'

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    public readonly id: number

    @CreateDateColumn()
    public readonly createdAt: Date

    @IsEmail()
    @Column()
    public email: string

    @IsString()
    @Length(8)
    @Column()
    public password: string

    @IsString()
    @Length(2)
    @Column()
    public firstName: string

    @IsString()
    @Length(2)
    @Column()
    public lastName: string
}
