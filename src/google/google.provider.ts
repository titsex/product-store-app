import { OAuth2Client } from 'google-auth-library'
import { Provider } from '@nestjs/common'

export const googleProvider: Provider[] = [
    {
        provide: 'GOOGLE_CONNECTION',
        useFactory: async () => {
            return new OAuth2Client({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                redirectUri: 'http://localhost:7000/auth/google',
            })
        },
    },
]
