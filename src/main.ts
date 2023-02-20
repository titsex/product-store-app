import * as cookieParser from 'cookie-parser'

import { transformValidationErrors } from '@utils'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '@app'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('Product Store')
        .setDescription('The product store API description')
        .setVersion('1.0')
        .addTag('product-store')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

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
