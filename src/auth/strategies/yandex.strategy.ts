import { Strategy, Profile } from 'passport-yandex'
import { PassportStrategy } from '@nestjs/passport'
import { UserService } from '@user/user.service'
import { Payload } from '@auth/dto/payload.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
    constructor(private readonly userService: UserService) {
        super({
            clientID: process.env.YANDEX_CLIENT_ID,
            clientSecret: process.env.YANDEX_CLIENT_SECRET,
            callbackURL: process.env.YANDEX_CALLBACK_URL,
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        console.log(profile)

        const { displayName, emails } = profile

        const user = await this.userService.validate({
            email: emails[0].value,
            displayName,
        })

        return new Payload(user) || null
    }
}
