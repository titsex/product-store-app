import { cacheProvider } from '@cache/cache.provider'
import { Module } from '@nestjs/common'
import { CacheService } from '@cache/cache.service'

@Module({
    exports: [CacheService],
    providers: [CacheService, ...cacheProvider],
})
export class CacheModule {}
