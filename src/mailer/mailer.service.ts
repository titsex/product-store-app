import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { Inject, Injectable } from '@nestjs/common'
import { Transporter } from 'nodemailer'

@Injectable()
export class MailerService {
    constructor(@Inject('MAILER_CONNECTION') private readonly mailer: Transporter<SMTPTransport.SentMessageInfo>) {}

    async sendAccountActivationLink(email: string, unique: string) {
        await this.mailer.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Account Activation',
            text: '',
            html: `
                    <a href='${process.env.CLIENT_URL}/auth/activate/${email}/${unique}'>
                        Click to activate your account
                    </a>`,
        })
    }
}
