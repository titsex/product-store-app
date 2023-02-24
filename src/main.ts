import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import * as passport from 'passport'

import { NestFactory } from '@nestjs/core'
import { AppModule } from '@app'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)


    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            saveUninitialized: false,
            resave: false,
            cookie: {
                maxAge: 60 * 1000,
            },
        })
    )

    app.use(passport.initialize())
    app.use(passport.session())
    app.use(cookieParser())

    await app.listen(7000)
}

bootstrap().then()
