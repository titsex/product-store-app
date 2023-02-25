import { UserEntity } from '@user/models/user.entity'
import { DataSource } from 'typeorm'

export const userProvider = [
    {
        provide: 'USER_ENTITY',
        useFactory: async (dataSource: DataSource) => dataSource.getRepository(UserEntity),
        inject: ['DATABASE_CONNECTION'],
    },
]
