import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IsArray, IsEmail, IsString, Length } from 'class-validator'
import { RolesList } from '@roles/roles.enum'
import { Optional } from '@nestjs/common'

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
    @Optional()
    @Column({ nullable: true })
    public password?: string

    @IsString()
    @Length(2)
    @Column()
    public firstName: string

    @IsString()
    @Length(2)
    @Optional()
    @Column({ nullable: true })
    public lastName?: string

    @IsArray()
    @Column('simple-array', { default: RolesList.User })
    public roles: RolesList[]
}
