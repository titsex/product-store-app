import { Strategy, MicrosoftStrategyOptions } from 'passport-microsoft'
import { PassportStrategy } from '@nestjs/passport'
import { Profile } from 'passport-google-oauth20'
import { UserService } from '@user/user.service'
import { Payload } from '@auth/dto/payload.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(Strategy, 'microsoft') {
    constructor(private readonly userService: UserService) {
        super({
            clientID: process.env.MICROSOFT_CLIENT_ID,
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
            callbackURL: process.env.MICROSOFT_CALLBACK_URL,
            scope: ['user.read'],
        } as MicrosoftStrategyOptions)
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
