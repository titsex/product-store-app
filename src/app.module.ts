import { DatabaseModule } from '@database/database.module'
import { MailerModule } from '@mailer/mailer.module'
import { UserModule } from '@user/user.module'
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV ? `.${process.env.NODE_ENV}.env` : `.development.env`,
        }),
        DatabaseModule,
        MailerModule,
        UserModule,
    ],
})
export class AppModule {}
