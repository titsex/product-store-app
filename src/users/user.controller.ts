import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@auth/guards/auth.guard'

@Controller('users')
export class UserController {
    @UseGuards(AuthGuard)
    @Get('/')
    async test() {
        return '1'
    }
}
