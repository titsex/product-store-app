import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const RefreshToken = createParamDecorator(
    (data: unknown, context: ExecutionContext) => context.switchToHttp().getRequest().cookies['refreshToken']
)
