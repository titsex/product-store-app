import { createTransport } from 'nodemailer'
import { Provider } from '@nestjs/common'

export const mailerProvider: Provider[] = [
    {
        provide: 'MAILER_CONNECTION',
        useFactory: async () => {
            return createTransport({
                host: process.env.EMAIL_SMTP,
                secure: true,
                port: Number(process.env.EMAIL_PORT),
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD,
                },
            })
        },
    },
]
