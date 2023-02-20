import { UserEntity } from '@user/models/user.entity'

export class GeneratePayload {
    public readonly email: string
    public readonly createdAt: Date
    public readonly firstName: string
    public readonly lastName: string

    constructor(user: UserEntity) {
        this.email = user.email
        this.createdAt = user.createdAt
        this.firstName = user.firstName
        this.lastName = user.lastName
    }
}
