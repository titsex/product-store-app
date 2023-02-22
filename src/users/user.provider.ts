import { UserEntity } from '@user/models/user.entity'
import { DataSource } from 'typeorm'

export const UserEntityKey = 'USER_ENTITY'

export const userProvider = [
    {
        provide: UserEntityKey,
        useFactory: async (dataSource: DataSource) => dataSource.getRepository(UserEntity),
        inject: ['DATABASE_CONNECTION'],
    },
]
