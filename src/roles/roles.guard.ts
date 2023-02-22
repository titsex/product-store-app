import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ROLES_KEY } from '@roles/roles.decorator'
import { RolesList } from '@roles/roles.enum'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<RolesList[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ])

        if (!requiredRoles) return true

        const request = context.switchToHttp().getRequest()

        const user = request.user
        if (!user) throw new UnauthorizedException()

        return requiredRoles.some((role) => user.roles?.includes(role))
    }
}
