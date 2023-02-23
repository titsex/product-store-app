import { googleProvider } from '@google/google.provider'
import { GoogleService } from '@google/google.service'
import { Module } from '@nestjs/common'

@Module({
    exports: [GoogleService, ...googleProvider],
    providers: [GoogleService, ...googleProvider],
})
export class GoogleModule {}
