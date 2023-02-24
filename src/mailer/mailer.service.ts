import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { Inject, Injectable } from '@nestjs/common'
import { Transporter } from 'nodemailer'

@Injectable()
export class MailerService {
    constructor(@Inject('MAILER_CONNECTION') private readonly mailer: Transporter<SMTPTransport.SentMessageInfo>) {}
}
