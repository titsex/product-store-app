import { UserEntity } from '@user/models/user.entity'
import { RolesList } from '@roles/roles.enum'

export class Payload implements UserEntity {
    public readonly id: number
    public readonly email: string
    public readonly displayName: string
    public readonly createdAt: Date
    public readonly roles: RolesList[]

    constructor(user: UserEntity) {
        this.id = user.id
        this.email = user.email
        this.displayName = user.displayName
        this.createdAt = user.createdAt
        this.roles = user.roles
    }
}
