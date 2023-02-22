import { SetMetadata } from '@nestjs/common'

export const AUTH_KEY = 'auth'
export const NeedAuth = () => SetMetadata(AUTH_KEY, true)
