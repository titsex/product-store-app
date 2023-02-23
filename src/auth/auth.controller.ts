import { Body, Controller, Get, Post, Res, Ip, Param, Query } from '@nestjs/common'
import { RefreshToken } from '@auth/decorators/refresh-token.decorator'
import { UserAgent } from '@auth/decorators/user-agent.decorator'
import { CreateUserDto } from '@user/dto/create-user.dto'
import { ActivateDto } from '@auth/dto/activate.dto'
import { AuthService } from '@auth/auth.service'
import { SigninDto } from '@auth/dto/signin.dto'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signup(@Body() dto: CreateUserDto) {
        return await this.authService.signup(dto)
    }

    @Post('signin')
    async signin(@Body() dto: SigninDto, @Res() response: Response, @Ip() ip: string, @UserAgent() userAgent: string) {
        const result = await this.authService.signin({ ...dto, userAgent, ip })

        response.cookie('refreshToken', result.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })

        return response.status(200).json(result)
    }

    @Get('signout')
    async signout(@Res() response: Response, @RefreshToken() refreshToken: string) {
        const result = await this.authService.signout(refreshToken)

        response.clearCookie('refreshToken')

        return response.status(200).json(result)
    }

    @Post('activate/:email/:unique')
    async activate(
        @Param() dto: ActivateDto,
        @Res() response: Response,
        @Ip() ip: string,
        @UserAgent() userAgent: string
    ) {
        const result = await this.authService.activate({ ...dto, userAgent, ip })

        response.cookie('refreshToken', result.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })

        return response.status(200).json(result)
    }

    @Post('refresh')
    async refresh(
        @Res() response: Response,
        @RefreshToken() refreshToken: string,
        @Ip() ip: string,
        @UserAgent() userAgent: string
    ) {
        const result = await this.authService.refresh({ refreshToken, ip, userAgent })

        response.cookie('refreshToken', result.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })

        return response.status(200).json(result)
    }

    @Get('google')
    async google(
        @Res() response: Response,
        @Ip() ip: string,
        @UserAgent() userAgent: string,
        @Query('code') code: string
    ) {
        const authorizeUrl = this.authService.getAuthorizeUrl()

        const data = await this.authService.getToken(code)
        if (!data) return response.redirect(authorizeUrl)

        const tokenInfo = await this.authService.verifyIdToken(data.tokens.id_token)
        if (!tokenInfo) return response.redirect(authorizeUrl)

        const result = await this.authService.oAuth({
            ip,
            userAgent,
            payload: tokenInfo.getPayload(),
            tokens: data.tokens,
        })

        response.cookie('refreshToken', result.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })

        return response.status(200).json(result)
    }
}
