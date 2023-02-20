import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { GeneratePayload } from '@auth/classes/generate-payload'
import { UserEntity } from '@user/models/user.entity'
import { SignupDto } from '@auth/dto/signup.dto'
import { SigninDto } from '@auth/dto/signin.dto'
import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcrypt'
import { Repository } from 'typeorm'
import { MailerService } from '@mailer/mailer.service'
import { ActivateDto } from '@auth/dto/activate.dto'
import { CacheService } from '@cache/cache.service'

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_ENTITY') private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
        private readonly cacheService: CacheService,
        private readonly mailerService: MailerService
    ) {}

    async signup(data: SignupDto) {
        const cachedCandidate = await this.cacheService.getCache(data.email, 'signup')

        if (cachedCandidate)
            throw new BadRequestException(
                'This mail is already at the last stage of registration, awaiting confirmation'
            )

        const candidate = await this.userRepository.findOneBy({ email: data.email })
        if (candidate) throw new BadRequestException(`A user with such an email already exists`)

        const hashedPassword = await hash(data.password, 5)

        const user = this.userRepository.create({
            ...data,
            password: hashedPassword,
        })

        await this.mailerService.sendAccountActivationLink(data.email, '123')
        await this.cacheService.setCache(user.email, JSON.stringify(user), 'signup')

        return { message: 'To confirm your identity, we have sent you an email link to activate your account' }
    }

    async signin(data: SigninDto) {
        const candidate = await this.userRepository.findOneBy({ email: data.email })
        if (!candidate) throw new BadRequestException(`There is no user with such an email address`)

        const passwordsIsMatch = await compare(data.password, candidate.password)
        if (!passwordsIsMatch) throw new BadRequestException('Invalid password')

        const payload = new GeneratePayload(candidate)
        const tokens = this.generateTokens(payload)

        // ToDo: save tokens
        return { user: payload, ...tokens }
    }

    async signout(token: string) {
        // ToDo delete token
    }

    async activate(data: ActivateDto) {
        const candidate = await this.userRepository.findOneBy({ email: data.email })
        if (candidate) throw new Error('Your account is already activated')

        const cachedCandidate = await this.cacheService.getCache(data.email, 'signup')
        if (!cachedCandidate) throw new Error('The email is incorrect or the time has expired')

        await this.cacheService.deleteCache(data.email, 'signup')

        const user: UserEntity = JSON.parse(cachedCandidate)
        await this.userRepository.save(user)

        const payload = new GeneratePayload(candidate)
        const tokens = this.generateTokens(payload)

        // ToDo: save tokens
        return { user: payload, ...tokens }
    }

    generateTokens(payload: GeneratePayload) {
        const plainPayload = JSON.parse(JSON.stringify(payload))

        const accessToken = this.jwtService.sign(plainPayload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '30s',
        })

        const refreshToken = this.jwtService.sign(plainPayload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '30d',
        })

        return { accessToken, refreshToken }
    }
}
