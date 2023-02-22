import { UserEntity } from '@user/models/user.entity'
import { RolesList } from '@roles/roles.enum'

export class GeneratePayload {
    public readonly id: number
    public readonly email: string
    public readonly createdAt: Date
    public readonly firstName: string
    public readonly lastName: string
    public readonly roles: RolesList[]

    constructor(user: UserEntity) {
        this.id = user.id
        this.email = user.email
        this.createdAt = user.createdAt
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.roles = user.roles
    }
}
