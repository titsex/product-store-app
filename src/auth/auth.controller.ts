import { MicrosoftGuard } from '@auth/guards/microsoft.guard'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { GoogleGuard } from '@auth/guards/google.guard'
import { User } from '@auth/decorators/user.decorator'
import { Payload } from '@auth/dto/payload.dto'
import { GithubGuard } from '@auth/guards/github.guard'
import { DiscordGuard } from '@auth/guards/discord.guard'
import { VKGuard } from '@auth/guards/vk.guard'
import { YandexGuard } from '@auth/guards/yandex.guard'

@Controller('auth')
export class AuthController {
    @Get('google/signin')
    @UseGuards(GoogleGuard)
    async googleSignIn() {}

    @Get('google/redirect')
    @UseGuards(GoogleGuard)
    async googleCallback(@User() user: Payload) {
        return user
    }

    @Get('microsoft/signin')
    @UseGuards(MicrosoftGuard)
    async microsoftSignIn() {}

    @Get('microsoft/redirect')
    @UseGuards(MicrosoftGuard)
    async microsoftCallback(@User() user: Payload) {
        return user
    }

    @Get('github/signin')
    @UseGuards(GithubGuard)
    async githubSignIn() {}

    @Get('github/redirect')
    @UseGuards(GithubGuard)
    async githubCallback(@User() user: Payload) {
        return user
    }

    @Get('discord/signin')
    @UseGuards(DiscordGuard)
    async discordSignIn() {}

    @Get('discord/redirect')
    @UseGuards(DiscordGuard)
    async discordCallback(@User() user: Payload) {
        return user
    }

    @Get('vk/signin')
    @UseGuards(VKGuard)
    async vkSignIn() {}

    @Get('vk/redirect')
    @UseGuards(VKGuard)
    async vkCallback(@User() user: Payload) {
        return user
    }

    @Get('yandex/signin')
    @UseGuards(YandexGuard)
    async yandexSignIn() {}

    @Get('yandex/redirect')
    @UseGuards(YandexGuard)
    async yandexCallback(@User() user: Payload) {
        return user
    }
}
