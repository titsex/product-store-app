import { RolesList } from '@roles/roles.enum'
import { SetMetadata } from '@nestjs/common'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: RolesList[]) => SetMetadata(ROLES_KEY, roles)
