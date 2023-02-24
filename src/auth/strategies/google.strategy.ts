import { Profile, Strategy } from 'passport-google-oauth20'
import { PassportStrategy } from '@nestjs/passport'
import { UserService } from '@user/user.service'
import { Payload } from '@auth/dto/payload.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly userService: UserService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['email', 'profile'],
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        const { displayName, emails } = profile

        const user = await this.userService.validate({
            email: emails[0].value,
            displayName,
        })

        return new Payload(user) || null
    }
}
