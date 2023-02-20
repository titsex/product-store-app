import { databaseProvider } from '@database/database.provider'
import { Module } from '@nestjs/common'

@Module({
    exports: [...databaseProvider],
    providers: [...databaseProvider],
})
export class DatabaseModule {}
