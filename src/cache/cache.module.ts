import { cacheProvider } from '@cache/cache.provider'
import { CacheService } from '@cache/cache.service'
import { Module } from '@nestjs/common'

@Module({
    exports: [CacheService],
    providers: [CacheService, ...cacheProvider],
})
export class CacheModule {}
