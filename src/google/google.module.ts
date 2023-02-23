import { Module } from '@nestjs/common'
import { GoogleService } from '@google/google.service'
import { googleProvider } from '@google/google.provider'

@Module({
    exports: [GoogleService, ...googleProvider],
    providers: [GoogleService, ...googleProvider],
})
export class GoogleModule {}
