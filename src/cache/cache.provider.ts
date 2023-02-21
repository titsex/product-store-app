import { Provider } from '@nestjs/common'
import { createClient } from 'redis'

export const cacheProvider: Provider[] = [
    {
        provide: 'CACHE_CONNECTION',
        useFactory: async () => {
            const client = createClient({
                url: process.env.REDIS_URL,
            })

            await client.connect()

            return client
        },
    },
]
