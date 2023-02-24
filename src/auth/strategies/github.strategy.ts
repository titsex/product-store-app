import { Strategy, Profile } from 'passport-github2'
import { PassportStrategy } from '@nestjs/passport'
import { UserService } from '@user/user.service'
import { Payload } from '@auth/dto/payload.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor(private readonly userService: UserService) {
        super({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
            scope: ['user:email'],
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
