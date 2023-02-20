import { DatabaseModule } from '@database/database.module'
import { AuthController } from '@auth/auth.controller'
import { MailerModule } from '@mailer/mailer.module'
import { userProvider } from '@user/user.provider'
import { AuthService } from '@auth/auth.service'
import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { CacheModule } from '@cache/cache.module'

@Module({
    imports: [JwtModule, DatabaseModule, MailerModule, CacheModule],
    controllers: [AuthController],
    providers: [AuthService, ...userProvider],
})
export class AuthModule {}
