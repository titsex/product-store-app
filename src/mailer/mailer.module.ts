import { mailerProvider } from '@mailer/mailer.provider'
import { MailerService } from '@mailer/mailer.service'
import { Module } from '@nestjs/common'

@Module({
    exports: [MailerService],
    providers: [MailerService, ...mailerProvider],
})
export class MailerModule {}
