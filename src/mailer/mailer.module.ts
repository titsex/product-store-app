import { mailerProvider } from '@mailer/mailer.provider'
import { Module } from '@nestjs/common'
import { MailerService } from '@mailer/mailer.service'

@Module({
    exports: [MailerService],
    providers: [MailerService, ...mailerProvider],
})
export class MailerModule {}
