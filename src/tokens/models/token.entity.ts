import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from '@user/models/user.entity'

@Entity('tokens')
export class TokenEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    refreshToken: string

    @Column({ type: 'bigint' })
    lastSignIn: number

    @Column()
    ip: string

    @Column()
    userAgent: string

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.tokens)
    user: UserEntity
}
