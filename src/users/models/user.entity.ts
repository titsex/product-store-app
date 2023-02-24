import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { RolesList } from '@roles/roles.enum'

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    public readonly id: number

    @CreateDateColumn()
    public readonly createdAt: Date

    @Column()
    public email: string

    @Column()
    public displayName: string

    @Column('simple-array', { default: RolesList.User })
    public roles: RolesList[]
}
