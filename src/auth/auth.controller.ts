import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common'
import { AuthService } from '@auth/auth.service'
import { SignupDto } from '@auth/dto/signup.dto'
import { SigninDto } from '@auth/dto/signin.dto'
import { Request, Response } from 'express'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    @ApiResponse({
        status: 200,
        description: 'Account signup, as a result, sends a confirmation link to the mail',
    })
    @ApiResponse({
        status: 400,
        description:
            'Returns a request error if the specified email is already at the confirmation stage or is registered at all',
    })
    async signup(@Body() dto: SignupDto) {
        return await this.authService.signup(dto)
    }

    @Post('signin')
    @ApiResponse({
        status: 200,
        description: 'Signin to the account, returns the user and a pair of access and refresh tokens',
    })
    @ApiResponse({
        status: 400,
        description:
            'Returns a request error if there is no user with the email specified at the login or the password is incorrect',
    })
    async signin(@Body() dto: SigninDto, @Req() request: Request, @Res() response: Response) {
        const result = await this.authService.signin(dto)

        response.cookie('refreshToken', result.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })

        return response.status(200).json(result)
    }

    @Get('signout')
    @ApiResponse({
        status: 200,
        description: `Signout from the account, redirects to the client's home page`,
    })
    @ApiResponse({
        status: 400,
        description: `Returns a request error if the user is not logged in`,
    })
    async signout(@Req() request: Request, @Res() response: Response) {
        const refreshToken = request.cookies['refreshToken']

        const result = await this.authService.signout(refreshToken)

        return response.status(200).json(result)
    }
}
