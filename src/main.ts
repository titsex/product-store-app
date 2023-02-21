import * as cookieParser from 'cookie-parser'

import { transformValidationErrors } from '@utils'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '@app'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            exceptionFactory: transformValidationErrors,
        })
    )

    app.use(cookieParser())

    await app.listen(7000)
}

bootstrap().then()
