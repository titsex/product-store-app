import { PassportSerializer } from '@nestjs/passport'
import { UserService } from '@user/user.service'
import { Payload } from '@auth/dto/payload.dto'
import { Injectable } from '@nestjs/common'
import { DoneCallback } from 'passport'

@Injectable()
export class SessionSerialize extends PassportSerializer {
    constructor(private readonly userService: UserService) {
        super()
    }

    serializeUser(user: Payload, done: DoneCallback) {
        done(null, user)
    }

    async deserializeUser(payload: Payload, done: DoneCallback) {
        const user = await this.userService.findOne(payload.email)
        return user ? done(null, user) : done(null, null)
    }
}
