import { TokenEntity } from '@token/models/token.entity'
import { DataSource } from 'typeorm'

export const tokenProvider = [
    {
        provide: 'TOKEN_ENTITY',
        useFactory: async (dataSource: DataSource) => dataSource.getRepository(TokenEntity),
        inject: ['DATABASE_CONNECTION'],
    },
]
