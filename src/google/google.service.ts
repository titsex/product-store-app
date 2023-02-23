import { Inject, Injectable } from '@nestjs/common'
import { OAuth2Client } from 'google-auth-library'

@Injectable()
export class GoogleService {
    constructor(@Inject('GOOGLE_CONNECTION') private readonly oAuth2Client: OAuth2Client) {}

    getAuthorizeUrl() {
        return this.oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: [
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile',
            ],
            prompt: 'consent',
        })
    }

    async getToken(code: string) {
        try {
            return await this.oAuth2Client.getToken(code)
        } catch {
            return null
        }
    }

    async verifyIdToken(token: string) {
        try {
            return await await this.oAuth2Client.verifyIdToken({ idToken: token })
        } catch {
            return null
        }
    }
}
