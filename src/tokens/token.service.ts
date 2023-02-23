import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { GeneratePayload } from '@auth/classes/generate-payload'
import { TokenEntity } from '@token/models/token.entity'
import { TokenEntityKey } from '@token/token.provider'
import { UserEntity } from '@user/models/user.entity'
import { decode, sign, verify } from 'jsonwebtoken'
import { Repository } from 'typeorm'

@Injectable()
export class TokenService {
    constructor(@Inject(TokenEntityKey) private readonly tokenRepository: Repository<TokenEntity>) {}

    async saveRefreshToken(user: UserEntity, refreshToken: string, ip: string, userAgent: string) {
        const tokens = await this.tokenRepository.findBy({ user: { id: user.id } })

        if (tokens.length) {
            for (const token of tokens) {
                const payload = decode(token.refreshToken)

                if (typeof payload === 'object' && 'exp' in payload && Date.now() < payload.exp)
                    await this.tokenRepository.delete(token.id)

                if (token.ip === ip && token.userAgent === userAgent) {
                    token.refreshToken = refreshToken
                    token.lastSignIn = Date.now()

                    return await this.tokenRepository.save(token)
                }
            }
        }

        const token = this.tokenRepository.create()

        token.user = user
        token.userAgent = userAgent
        token.ip = ip
        token.refreshToken = refreshToken
        token.lastSignIn = Date.now()

        return await this.tokenRepository.save(token)
    }

    async removeRefreshToken(refreshToken: string) {
        const candidate = await this.tokenRepository.findOneBy({ refreshToken })
        if (!candidate) throw new UnauthorizedException()

        return await this.tokenRepository.delete(candidate.id)
    }

    async findRefreshToken(refreshToken: string) {
        return await this.tokenRepository.findBy({ refreshToken })
    }

    validateRefreshToken(refreshToken: string) {
        try {
            return verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        } catch (error) {
            return null
        }
    }

    validateAccessToken(accessToken: string) {
        try {
            return verify(accessToken, process.env.JWT_ACCESS_SECRET)
        } catch (error) {
            return null
        }
    }

    generateTokens(payload: GeneratePayload) {
        const plainPayload = JSON.parse(JSON.stringify(payload))

        const accessToken = sign(plainPayload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '30s',
        })

        const refreshToken = sign(plainPayload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '30d',
        })

        return { accessToken, refreshToken }
    }

    decodeToken(token: string) {
        return decode(token)
    }
}
