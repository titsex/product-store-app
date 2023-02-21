import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common'
import { AuthService } from '@auth/auth.service'
import { SignupDto } from '@auth/dto/signup.dto'
import { SigninDto } from '@auth/dto/signin.dto'
import { Request, Response } from 'express'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signup(@Body() dto: SignupDto) {
        return await this.authService.signup(dto)
    }

    @Post('signin')
    async signin(@Body() dto: SigninDto, @Req() request: Request, @Res() response: Response) {
        const result = await this.authService.signin(dto)

        response.cookie('refreshToken', result.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })

        return response.status(200).json(result)
    }

    @Get('signout')
    async signout(@Req() request: Request, @Res() response: Response) {
        const refreshToken = request.cookies['refreshToken']

        const result = await this.authService.signout(refreshToken)

        return response.status(200).json(result)
    }
}
