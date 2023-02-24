import { Strategy, Profile } from 'passport-vk-strategy'
import { PassportStrategy } from '@nestjs/passport'
import { UserService } from '@user/user.service'
import { Payload } from '@auth/dto/payload.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class VKStrategy extends PassportStrategy(Strategy, 'vk') {
    constructor(private readonly userService: UserService) {
        super({
            clientID: process.env.VK_CLIENT_ID,
            clientSecret: process.env.VK_CLIENT_SECRET,
            callbackURL: process.env.VK_CALLBACK_URL,
            profileFields: ['email'],
            scope: ['email'],
            apiVersion: '5.131',
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
