import { AuthGuard as PassportAuthGuard, IAuthGuard } from '@nestjs/passport'
import { ExecutionContext, UnauthorizedException } from '@nestjs/common'

export function AuthGuard(name: string): IAuthGuard {
    class Guard extends PassportAuthGuard(name) {
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

    return new Guard(name)
}
