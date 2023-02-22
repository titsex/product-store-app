import { AuthController } from '@auth/auth.controller'
import { MailerModule } from '@mailer/mailer.module'
import { CacheModule } from '@cache/cache.module'
import { TokenModule } from '@token/token.module'
import { AuthService } from '@auth/auth.service'
import { UserModule } from '@user/user.module'
import { Module } from '@nestjs/common'

@Module({
    imports: [MailerModule, CacheModule, TokenModule, UserModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
