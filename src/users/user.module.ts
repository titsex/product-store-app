import { DatabaseModule } from '@database/database.module'
import { UserController } from '@user/user.controller'
import { userProvider } from '@user/user.provider'
import { UserService } from '@user/user.service'
import { Module } from '@nestjs/common'
import { TokenModule } from '@token/token.module'

@Module({
    imports: [DatabaseModule, TokenModule],
    exports: [...userProvider],
    controllers: [UserController],
    providers: [UserService, ...userProvider],
})
export class UserModule {}
