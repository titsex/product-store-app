import { Inject, Injectable } from '@nestjs/common'
import { Transporter } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

@Injectable()
export class MailerService {
    constructor(@Inject('MAILER_CONNECTION') private readonly mailer: Transporter<SMTPTransport.SentMessageInfo>) {}

    async sendAccountActivationLink(email: string, link: string) {
        await this.mailer.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Account Activation',
            text: '',
            html: `
                    <a href='${process.env.CLIENT_URL}/auth/activate?email=${email}&unique=${link}'>
                        Click to activate your account
                    </a>`,
        })
    }
}
