import { Credentials, TokenPayload } from 'google-auth-library'

export class OauthDto {
    public payload: TokenPayload

    public tokens: Credentials

    public ip: string

    public userAgent: string
}
