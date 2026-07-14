import api from './api'

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  email: string
  username: string
  password: string
  fullName?: string
}

export interface SocialLoginDto {
  provider: 'google' | 'facebook' | 'instagram'
  token: string
}

export interface UserInfo {
  id: string
  email: string
  username: string
  role: string
  fullName?: string
  avatarUrl?: string
}

export interface TokenResponse {
  accessToken: string
  refreshToken: string
  expiresAt: string
  user: UserInfo
}

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
}

export const authService = {
  async login(dto: LoginDto) {
    const res = await api.post<ApiResponse<TokenResponse>>('/auth/login', dto)
    return res.data
  },
  async register(dto: RegisterDto) {
    const res = await api.post<ApiResponse<TokenResponse>>('/auth/register', dto)
    return res.data
  },
  async socialLogin(dto: SocialLoginDto) {
    const res = await api.post<ApiResponse<TokenResponse>>('/auth/social-login', dto)
    return res.data
  },
  async sendMagicLink(email: string) {
    const res = await api.post<ApiResponse<{ magicLink?: string }>>('/auth/send-magic-link', { email })
    return res.data
  },
  async verifyMagicLink(token: string) {
    const res = await api.get<ApiResponse<TokenResponse>>('/auth/verify-magic-link', { params: { token } })
    return res.data
  }
}
