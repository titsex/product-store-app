import { CreateUserDto } from '@user/dto/create-user.dto'
import { UserEntity } from '@user/models/user.entity'
import { Inject, Injectable } from '@nestjs/common'
import { UserEntityKey } from '@user/user.provider'
import { Repository } from 'typeorm'
import { hash } from 'bcrypt'

@Injectable()
export class UserService {
    constructor(@Inject(UserEntityKey) private readonly userRepository: Repository<UserEntity>) {}

    async create(data: CreateUserDto) {
        const user = this.userRepository.create(data)

        if (data.password) {
            user.password = await hash(data.password, 5)
        }

        return user
    }

    async save(user: UserEntity) {
        return await this.userRepository.save(user)
    }

    async findOne(criteria: string | number) {
        return await this.userRepository.findOneBy(
            typeof criteria === 'string' ? { email: criteria } : { id: criteria }
        )
    }
}
