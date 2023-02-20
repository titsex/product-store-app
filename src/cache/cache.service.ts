import { Inject, Injectable } from '@nestjs/common'
import { RedisClientType } from 'redis'
import { CacheType } from '@cache/types/cache.type'

@Injectable()
export class CacheService {
    constructor(@Inject('CACHE_CONNECTION') private readonly cacheClient: RedisClientType) {}

    async getCache(key: string, type: CacheType) {
        try {
            return await this.cacheClient.get(`${key}/${type}`)
        } catch (error) {
            throw new Error('An error has occurred. Data could not be retrieved.')
        }
    }

    async setCache(key: string, value: string, type: CacheType) {
        try {
            await this.cacheClient.set(`${key}/${type}`, value, { EX: 60 * 5 })
        } catch (error) {
            throw new Error('An error has occurred. Data could not be saved.')
        }
    }

    async deleteCache(key: string, type: CacheType) {
        try {
            await this.cacheClient.del(`${key}/${type}`)
        } catch (error) {
            throw new Error('An error has occurred. Failed to delete data.')
        }
    }
}
