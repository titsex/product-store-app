import { DatabaseModule } from '@database/database.module'
import { AuthController } from '@auth/auth.controller'
import { MailerModule } from '@mailer/mailer.module'
import { userProvider } from '@user/user.provider'
import { CacheModule } from '@cache/cache.module'
import { TokenModule } from '@token/token.module'
import { AuthService } from '@auth/auth.service'
import { Module } from '@nestjs/common'

@Module({
    imports: [DatabaseModule, MailerModule, CacheModule, TokenModule],
    controllers: [AuthController],
    providers: [AuthService, ...userProvider],
})
export class AuthModule {}
