import { Controller, Get, UseGuards } from '@nestjs/common'
import { User } from '@auth/decorators/user.decorator'
import { AuthGuard } from '@auth/guards/auth.guard'
import { Payload } from '@auth/dto/payload.dto'

@Controller('auth')
export class AuthController {
    @Get('google/signin')
    @UseGuards(AuthGuard('google'))
    async googleSignIn() {}

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleCallback(@User() user: Payload) {
        return user
    }

    @Get('microsoft/signin')
    @UseGuards(AuthGuard('microsoft'))
    async microsoftSignIn() {}

    @Get('microsoft/redirect')
    @UseGuards(AuthGuard('microsoft'))
    async microsoftCallback(@User() user: Payload) {
        return user
    }

    @Get('github/signin')
    @UseGuards(AuthGuard('github'))
    async githubSignIn() {}

    @Get('github/redirect')
    @UseGuards(AuthGuard('github'))
    async githubCallback(@User() user: Payload) {
        return user
    }

    @Get('discord/signin')
    @UseGuards(AuthGuard('discord'))
    async discordSignIn() {}

    @Get('discord/redirect')
    @UseGuards(AuthGuard('discord'))
    async discordCallback(@User() user: Payload) {
        return user
    }

    @Get('vk/signin')
    @UseGuards(AuthGuard('vk'))
    async vkSignIn() {}

    @Get('vk/redirect')
    @UseGuards(AuthGuard('vk'))
    async vkCallback(@User() user: Payload) {
        return user
    }

    @Get('yandex/signin')
    @UseGuards(AuthGuard('yandex'))
    async yandexSignIn() {}

    @Get('yandex/redirect')
    @UseGuards(AuthGuard('yandex'))
    async yandexCallback(@User() user: Payload) {
        return user
    }
}
