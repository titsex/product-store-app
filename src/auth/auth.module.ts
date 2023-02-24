import { MicrosoftStrategy } from '@auth/strategies/microsoft.strategy'
import { GoogleStrategy } from '@auth/strategies/google.strategy'
import { SessionSerialize } from '@auth/classes/session.serialize'
import { AuthController } from '@auth/auth.controller'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from '@auth/auth.service'
import { UserModule } from '@user/user.module'
import { Module } from '@nestjs/common'
import { GithubStrategy } from '@auth/strategies/github.strategy'
import { DiscordStrategy } from '@auth/strategies/discord.strategy'
import { VKStrategy } from '@auth/strategies/vk.strategy'
import { YandexStrategy } from '@auth/strategies/yandex.strategy'

@Module({
    imports: [PassportModule.register({ session: true }), UserModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        GoogleStrategy,
        MicrosoftStrategy,
        GithubStrategy,
        DiscordStrategy,
        VKStrategy,
        YandexStrategy,
        SessionSerialize,
    ],
})
export class AuthModule {}
