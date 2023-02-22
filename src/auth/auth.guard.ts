import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { TokenService } from '@token/token.service'
import { Reflector } from '@nestjs/core'
import { AUTH_KEY } from '@auth/decorators/auth.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly tokenService: TokenService, private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const authIsRequired = this.reflector.getAllAndOverride<boolean>(AUTH_KEY, [
            context.getHandler(),
            context.getClass(),
        ])

        if (!authIsRequired) return true

        const request = context.switchToHttp().getRequest()

        const authorization = request.headers['authorization']
        if (!authorization) throw new UnauthorizedException()

        const accessToken = authorization.split(' ')[1]
        if (!accessToken) throw new UnauthorizedException()

        const userData = this.tokenService.validateAccessToken(accessToken)
        if (!userData) throw new UnauthorizedException()

        request.user = userData
        return true
    }
}
