import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { GeneratePayload } from '@auth/classes/generate-payload'
import { CreateUserDto } from '@user/dto/create-user.dto'
import { MailerService } from '@mailer/mailer.service'
import { UserEntity } from '@user/models/user.entity'
import { ActivateDto } from '@auth/dto/activate.dto'
import { CacheService } from '@cache/cache.service'
import { TokenService } from '@token/token.service'
import { RefreshDto } from '@auth/dto/refresh.dto'
import { SigninDto } from '@auth/dto/signin.dto'
import { UserService } from '@user/user.service'
import { generateUniqueHex } from '@utils'
import { compare } from 'bcrypt'
import { GoogleService } from '@google/google.service'
import { OauthDto } from '@auth/dto/oauth.dto'

@Injectable()
export class AuthService {
    constructor(
        private readonly cacheService: CacheService,
        private readonly tokenService: TokenService,
        private readonly userService: UserService,
        private readonly mailerService: MailerService,
        private readonly googleService: GoogleService
    ) {}

    async signup(data: CreateUserDto) {
        const cachedCandidate = await this.cacheService.getCache(data.email, 'signup')

        if (cachedCandidate)
            throw new BadRequestException(
                'This email is already at the last stage of registration, awaiting confirmation'
            )

        const candidate = await this.userService.findOne(data.email)
        if (candidate) throw new BadRequestException(`A user with such an email already exists`)

        const user = await this.userService.create(data)
        const unique = await generateUniqueHex()

        await this.mailerService.sendAccountActivationLink(data.email, unique)
        await this.cacheService.setCache(user.email, JSON.stringify({ user, unique }), 'signup')

        return { message: 'To confirm your identity, we have sent you an email link to activate your account' }
    }

    async signin(data: SigninDto) {
        const candidate = await this.userService.findOne(data.email)
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
        const candidate = await this.userService.findOne(data.email)
        if (candidate) throw new BadRequestException('Your account is already activated')

        const cachedCandidate = await this.cacheService.getCache(data.email, 'signup')
        if (!cachedCandidate) throw new BadRequestException('The email is incorrect or the time has expired')

        await this.cacheService.deleteCache(data.email, 'signup')

        const parsedCache = JSON.parse(cachedCandidate)

        if ('unique' in parsedCache && parsedCache.unique !== data.unique)
            throw new BadRequestException('Invalid activation link')

        const user: UserEntity = parsedCache.user
        await this.userService.save(user)

        const payload = new GeneratePayload(user)
        const tokens = this.tokenService.generateTokens(payload)

        await this.tokenService.saveRefreshToken(user, tokens.refreshToken, data.ip, data.userAgent)
        return { user: payload, ...tokens }
    }

    async refresh(data: RefreshDto) {
        if (!data.refreshToken) throw new UnauthorizedException()

        const userData = this.tokenService.validateRefreshToken(data.refreshToken) as GeneratePayload
        const tokenFromDb = await this.tokenService.findRefreshToken(data.refreshToken)

        if (!userData || !tokenFromDb) throw new UnauthorizedException()

        const user = await this.userService.findOne(userData.id)
        if (!user) throw new BadRequestException('The user is not in the database')

        const payload = new GeneratePayload(user)
        const tokens = this.tokenService.generateTokens(payload)

        await this.tokenService.saveRefreshToken(user, tokens.refreshToken, data.ip, data.userAgent)
        return { user: payload, ...tokens }
    }

    async getToken(code: string) {
        return await this.googleService.getToken(code)
    }

    async oAuth(data: OauthDto) {
        let user: UserEntity

        const candidate = await this.userService.findOne(data.payload.email)

        if (candidate) user = candidate
        else {
            user = await this.userService.create({
                email: data.payload.email,
                firstName: data.payload.given_name,
                lastName: data.payload.family_name,
            })

            user = await this.userService.save(user)
        }

        const payload = new GeneratePayload(user)
        const tokens = this.tokenService.generateTokens(payload)

        await this.tokenService.saveRefreshToken(user, tokens.refreshToken, data.ip, data.userAgent)
        return { user: payload, ...tokens }
    }

    async verifyIdToken(token: string) {
        return await this.googleService.verifyIdToken(token)
    }

    getAuthorizeUrl() {
        return this.googleService.getAuthorizeUrl()
    }
}
