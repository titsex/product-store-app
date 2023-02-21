import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IsEmail, IsString, Length } from 'class-validator'
import { TokenEntity } from '@token/models/token.entity'

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

    @OneToMany(() => TokenEntity, (token: TokenEntity) => token.user)
    tokens: TokenEntity[]
}
