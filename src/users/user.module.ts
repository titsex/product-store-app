import { DatabaseModule } from '@database/database.module'
import { UserController } from '@user/user.controller'
import { userProvider } from '@user/user.provider'
import { UserService } from '@user/user.service'
import { Module } from '@nestjs/common'

@Module({
    imports: [DatabaseModule],
    exports: [UserService],
    controllers: [UserController],
    providers: [UserService, ...userProvider],
})
export class UserModule {}
