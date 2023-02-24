import { CreateUserDto } from '@user/dto/create-user.dto'
import { UserEntity } from '@user/models/user.entity'
import { Inject, Injectable } from '@nestjs/common'
import { UserEntityKey } from '@user/user.provider'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
    constructor(@Inject(UserEntityKey) private readonly userRepository: Repository<UserEntity>) {}

    async create(data: CreateUserDto) {
        const user = this.userRepository.create(data)
        return await this.userRepository.save(user)
    }

    async findOne(criteria: string | number) {
        return await this.userRepository.findOneBy(
            typeof criteria === 'string' ? { email: criteria } : { id: criteria }
        )
    }

    async validate(data: CreateUserDto) {
        const candidate = await this.findOne(data.email)
        if (candidate) return candidate

        return await this.create(data)
    }
}
