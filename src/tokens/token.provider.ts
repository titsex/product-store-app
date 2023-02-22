import { TokenEntity } from '@token/models/token.entity'
import { DataSource } from 'typeorm'

export const TokenEntityKey = 'TOKEN_ENTITY'

export const tokenProvider = [
    {
        provide: TokenEntityKey,
        useFactory: async (dataSource: DataSource) => dataSource.getRepository(TokenEntity),
        inject: ['DATABASE_CONNECTION'],
    },
]
