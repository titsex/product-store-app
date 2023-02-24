import { Strategy, Profile } from 'passport-discord'
import { PassportStrategy } from '@nestjs/passport'
import { UserService } from '@user/user.service'
import { Payload } from '@auth/dto/payload.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
    constructor(private readonly userService: UserService) {
        super({
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            callbackURL: process.env.DISCORD_CALLBACK_URL,
            scope: ['email', 'identify'],
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        const { username, discriminator, email } = profile

        const user = await this.userService.validate({
            email: email,
            displayName: `${username}#${discriminator}`,
        })

        return new Payload(user) || null
    }
}
