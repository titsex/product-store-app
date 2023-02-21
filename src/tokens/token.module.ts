import { DatabaseModule } from '@database/database.module'
import { tokenProvider } from '@token/token.provider'
import { TokenService } from '@token/token.service'
import { Module } from '@nestjs/common'

@Module({
    imports: [DatabaseModule],
    exports: [TokenService],
    providers: [TokenService, ...tokenProvider],
})
export class TokenModule {}
