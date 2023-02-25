import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import * as passport from 'passport'

import { NestFactory } from '@nestjs/core'
import { AppModule } from '@app'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.use(
        session({
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET,
            resave: false,
            cookie: {
                sameSite: true,
                httpOnly: false,
                maxAge: 60000,
            },
        })
    )
    passport.initialize()
    passport.session()

    app.use(cookieParser())

    await app.listen(7000)
}

bootstrap().then()
