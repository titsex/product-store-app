import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { GeneratePayload } from '@auth/classes/generate-payload'
import { MailerService } from '@mailer/mailer.service'
import { UserEntity } from '@user/models/user.entity'
import { ActivateDto } from '@auth/dto/activate.dto'
import { CacheService } from '@cache/cache.service'
import { TokenService } from '@token/token.service'
import { SignupDto } from '@auth/dto/signup.dto'
import { SigninDto } from '@auth/dto/signin.dto'
import { compare, hash } from 'bcrypt'
import { Repository } from 'typeorm'
import { v4 } from 'uuid'

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_ENTITY') private readonly userRepository: Repository<UserEntity>,
        private readonly cacheService: CacheService,
        private readonly tokenService: TokenService,
        private readonly mailerService: MailerService
    ) {}

    async signup(data: SignupDto) {
        const cachedCandidate = await this.cacheService.getCache(data.email, 'signup')

        if (cachedCandidate)
            throw new BadRequestException(
                'This email is already at the last stage of registration, awaiting confirmation'
            )

        const candidate = await this.userRepository.findOneBy({ email: data.email })
        if (candidate) throw new BadRequestException(`A user with such an email already exists`)

        const hashedPassword = await hash(data.password, 5)

        const user = this.userRepository.create({
            ...data,
            password: hashedPassword,
        })

        const unique = v4()

        await this.mailerService.sendAccountActivationLink(data.email, unique)
        await this.cacheService.setCache(user.email, JSON.stringify({ user, unique }), 'signup')

        return { message: 'To confirm your identity, we have sent you an email link to activate your account' }
    }

    async signin(data: SigninDto) {
        const candidate = await this.userRepository.findOneBy({ email: data.email })
        if (!candidate) throw new BadRequestException(`There is no user with such an email address`)

        const passwordsIsMatch = await compare(data.password, candidate.password)
        if (!passwordsIsMatch) throw new BadRequestException('Invalid password')

        const payload = new GeneratePayload(candidate)
        const tokens = this.tokenService.generateTokens(payload)

        await this.tokenService.saveRefreshToken(candidate, tokens.refreshToken, data.ip, data.userAgent)
        return { user: payload, ...tokens }
    }

    async signout(token: string) {
        await this.tokenService.removeRefreshToken(token)
        return { message: 'You have successfully signed out' }
    }

    async activate(data: ActivateDto) {
        const candidate = await this.userRepository.findOneBy({ email: data.email })
        if (candidate) throw new BadRequestException('Your account is already activated')

        const cachedCandidate = await this.cacheService.getCache(data.email, 'signup')
        if (!cachedCandidate) throw new BadRequestException('The email is incorrect or the time has expired')

        await this.cacheService.deleteCache(data.email, 'signup')

        const parsedCache = JSON.parse(cachedCandidate)

        if ('unique' in parsedCache && parsedCache.unique !== data.unique)
            throw new BadRequestException('Invalid activation link')

        const user: UserEntity = parsedCache.user
        await this.userRepository.save(parsedCache.user)

        const payload = new GeneratePayload(user)
        const tokens = this.tokenService.generateTokens(payload)

        await this.tokenService.saveRefreshToken(user, tokens.refreshToken, data.ip, data.userAgent)
        return { user: payload, ...tokens }
    }
}
