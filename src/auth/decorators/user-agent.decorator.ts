import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const UserAgent = createParamDecorator(
    (data: unknown, context: ExecutionContext) => context.switchToHttp().getRequest().headers['user-agent']
)
