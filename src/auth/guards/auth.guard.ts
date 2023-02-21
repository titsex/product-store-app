import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { TokenService } from '@token/token.service'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly tokenService: TokenService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()

        const authorization = request.headers['authorization']
        if (!authorization) throw new UnauthorizedException()

        const accessToken = authorization.split(' ')[1]
        if (!accessToken) throw new UnauthorizedException()

        const userData = this.tokenService.validateAccessToken(accessToken)
        if (!userData) throw new UnauthorizedException()

        return true
    }
}
