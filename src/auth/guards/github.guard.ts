import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GithubGuard extends AuthGuard('github') {
    async canActivate(context: ExecutionContext) {
        try {
            const activate = (await super.canActivate(context)) as boolean
            const request = context.switchToHttp().getRequest()

            await super.logIn(request)
            return activate
        } catch {
            throw new UnauthorizedException()
        }
    }
}