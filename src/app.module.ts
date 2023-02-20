import { DatabaseModule } from '@database/database.module'
import { AuthModule } from '@auth/auth.module'
import { UserModule } from '@user/user.module'
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { MailerModule } from '@mailer/mailer.module'
import { CacheModule } from '@cache/cache.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV ? `.${process.env.NODE_ENV}.env` : `.development.env`,
        }),
        DatabaseModule,
        MailerModule,
        CacheModule,
        UserModule,
        AuthModule,
    ],
})
export class AppModule {}
